import MainLayout from "@/layouts/main-layout";
import {
  IconLayoutGridFilled,
} from "@tabler/icons-react";

import DateRangeFilter from "@/features/perform/components/DateRangeFilter";
import useDateRangeQuery from "@/features/perform/hooks/useDateRangeQuery";
import { apiEndpoints } from "@/config/api";
import { formatDateID, formatDateIDFull, formatSince, getYesterdayRange } from "@/helpers/formatDate";
import { ChartAreaGradient } from "@/components/chart-area-gradient";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import StatCard from "@/components/ui/stat-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    borderColor: "#2E9",
  },
  {
    key: "income",
    title: "Total Pendapatan",
    icon: "wallet",
    borderColor: "#2E964C",
  }
];

export default function DashboardPage() {
  const breadcrumbs = [
    { icon: IconLayoutGridFilled, label: "Dashboard", url: "/dashboard" },
  ];

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

  const chartData = data?.charts.map(item => ({
    ...item,
    date: formatDateID(item.date),
    dateFull: formatDateIDFull(item.date) 
  }));

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
          const metric = data?.metrics?.[key] || {};
          return (
            <StatCard
              key={key}
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
          );
        })}
        <StatCard title="Total Studio" value={data?.metrics?.studio || 0} icon="studio" borderColor="#D92E8D" since="Total Semua Studio" />
        <StatCard title="Total Akun" value={data?.metrics?.account || 0} icon="account" borderColor="#D9A12E" since="Total Semua Akun" />
        <StatCard title="Total Host" value={data?.metrics?.host || 0} icon="host" borderColor="#A12ED9" since="Total Semua Host" />
      </div>

      <ChartAreaGradient data={chartData} />

    </MainLayout>
  )

}
