import MainLayout from "@/layouts/main-layout";
import {
  IconLayoutGridFilled,
} from "@tabler/icons-react";

import DateRangeFilter from "@/features/perform/components/DateRangeFilter";
import useDateRangeQuery from "@/features/perform/hooks/useDateRangeQuery";
import { apiEndpoints } from "@/config/api";
import { formatDateID, formatDateIDFull, formatSince, getYesterdayRange } from "@/helpers/formatDate";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import StatCard from "@/components/ui/stat-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { ChartLineLabel } from "@/components/DashboardChart";
import { DataTablePinning } from "@/components/data-table-pinning";

const metricsConfig = [
  {
    key: "gmv",
    title: "Total GMV",
    icon: "cart",
    borderColor: "#3818D9",
  },
  {
    key: "commission",
    title: "Total Komisi",
    icon: "coin",
    borderColor: "#EE8D5B",
  },
  {
    key: "ads",
    title: "Total Iklan + PPN",
    icon: "ad",
    borderColor: "#DC143C",
  },
  {
    key: "income",
    title: "Total Pendapatan",
    icon: "wallet",
    borderColor: "#2E964C",
  }
];

const chartConfig = {
  gmv: {
    label: "GMV",
    color: "#3818D9",
  },
  commission: {
    label: "Komisi",
    color: "#EE8D5B",
  },
  ads: {
    label: "Iklan + PPN",
    color: "#DC143C",
  },
  income: {
    label: "Pendapatan",
    color: "#2E964C",
  },
}

const tableConfig = [
  {
    id: "date",
    accessorKey: "date",
    header: () => <div className="pl-4 pr-8 font-semibold">Tanggal</div>,
    cell: ({ getValue }) => <div className="pl-4">{formatDateIDFull(getValue())}</div>,
  },
  {
    id: "gmv",
    accessorKey: "gmv",
    header: () => <div className="pl-4 pr-8 font-semibold">GMV</div>,
    cell: ({ getValue }) => <div className="pl-4">{formatShort(getValue())}</div>,
  },
  {
    id: "ads",
    accessorKey: "ads",
    header: () => <div className="pl-4 pr-8 font-semibold">Iklan + PPN</div>,
    cell: ({ getValue }) => <div className="pl-4">{formatShort(getValue())}</div>,
  },
  {
    id: "commission",
    accessorKey: "commission",
    header: () => <div className="pl-4 pr-8 font-semibold">Komisi</div>,
    cell: ({ getValue }) => <div className="pl-4">{formatShort(getValue())}</div>,
  },
  {
    id: "income",
    accessorKey: "income",
    header: () => <div className="pl-4 pr-8 font-semibold">Pendapatan</div>,
    cell: ({ getValue }) => <div className="pl-4">{formatShort(getValue())}</div>,
  },
]




export default function DashboardPage() {
  const [selectedMetric, setSelectedMetric] = useState(metricsConfig[0].key)
  const breadcrumbs = [
    { icon: IconLayoutGridFilled, label: "Dashboard", url: "/dashboard" },
  ];
  const handleSelectMetric = (key) => {
    setSelectedMetric(key)
  }
  const {
    data,
    isFetching,
    handleApplyDateRange,
    appliedRange,
  } = useDateRangeQuery({
    queryKey: ["perform-account"],
    url: apiEndpoints.dashboard.index(),
    range: getYesterdayRange(),
  });


  const activeMetricData = data?.charts?.map(item => ({
    ...item,
    date: formatDateID(item.date),
    dateFull: formatDateIDFull(item.date),
    value: item[selectedMetric] || 0,
  })) || []

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="justify-self-end flex">
        <DateRangeFilter
          dateRange={appliedRange}
          onApply={handleApplyDateRange}
          isLoading={isFetching}
        />
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 my-3">

        {metricsConfig.map(({ key, title, icon, borderColor }) => {
          const metric = data?.metrics?.[key] || {}
          const isActive = key === selectedMetric

          return (
            <button
              key={key}
              onClick={() => handleSelectMetric(key)}
              className={`p-0 transition-all rounded-xl hover:cursor-pointer ${isActive ? "ring-2 ring-offset-2 ring-primary" : ""}`}
            >
              <StatCard
                title={title}
                value={
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-pointer">
                          {formatShort(metric.total || 0)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {formatFull(metric.total || 0)}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                }
                percentage={`${metric.ratio || 0}`}
                trend={metric.ratio >= 0 ? "up" : "down"}
                icon={icon}
                borderColor={borderColor}
                since={formatSince(data?.current_period?.days || 0)}
              />
            </button>
          )
        })}

        <StatCard title="Total Studio" value={data?.metrics?.studio || 0} icon="studio" borderColor="#D92E8D" since="Total Semua Studio" />
        <StatCard title="Total Akun" value={data?.metrics?.account || 0} icon="account" borderColor="#D9A12E" since="Total Semua Akun" />
        <StatCard title="Total Host" value={data?.metrics?.host || 0} icon="host" borderColor="#A12ED9" since="Total Semua Host" />
      </div>

      <ChartLineLabel
        dataKey={selectedMetric}
        title={chartConfig[selectedMetric].label}
        chartConfig={chartConfig}
        chartData={activeMetricData}
      />

      <DataTablePinning
        columns={tableConfig}
        data={data?.charts || []}
      />

    </MainLayout>
  )

}
