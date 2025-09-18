import PerformTable from "@/components/perform-table";
import { apiEndpoints } from "@/config/api";
import { formatPercentage, getPercentageACOS, getPercentageROAS } from "@/helpers/formatPercent";
import MainLayout from "@/layouts/main-layout";
import { IconChartLine } from "@tabler/icons-react";
import DateRangeFilter from "../components/DateRangeFilter";
import useDateRangeQuery from "../hooks/useDateRangeQuery";
import { formatSince, getYesterdayRange } from "@/helpers/formatDate";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import StatCard from "@/components/ui/stat-card";


export default function AccountPerformPage() {

  const {
    data,
    isFetching,
    handleApplyDateRange,
    appliedRange,
  } = useDateRangeQuery({
    queryKey: ["perform-account"],
    url: apiEndpoints.perform.account(),
    range: getYesterdayRange(),
  });

  const ColumnAccount = [
    {
      id: "akun",
      accessorKey: "account_name",
      header: "Akun",
      cell: ({ getValue }) => <div >{getValue()}</div>,
    },
    {
      id: "gmv",
      accessorKey: "gmv",
      header: "GMV",
      cell: ({ getValue }) => <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-pointer">
              {formatShort(getValue())}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {formatFull(getValue())}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    },
    {
      id: "komisi",
      accessorKey: "commission",
      header: "Komisi",
      cell: ({ getValue }) => <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-pointer">
              {formatShort(getValue())}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {formatFull(getValue())}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    },
    {
      id: "iklan",
      accessorKey: "ads",
      header: "Iklan + PPN",
      cell: ({ getValue }) => <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-pointer">
              {formatShort(getValue())}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {formatFull(getValue())}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    },
    {
      id: "acos",
      accessorKey: "acos",
      header: "ACOS",
      cell: ({ getValue }) => <div className={`${getPercentageACOS(getValue())} w-max`} >{formatPercentage(getValue())}</div>,
    }, {
      id: "roas",
      accessorKey: "roas",
      header: "ROAS",
      cell: ({ getValue }) => <div className={`${getPercentageROAS(getValue())} w-max`}>{formatPercentage(getValue())}</div>,
    }, {
      id: "income",
      accessorKey: "income",
      header: "Pendapatan",
      cell: ({ getValue }) => <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-pointer">
              {formatShort(getValue())}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {formatFull(getValue())}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    },
  ]

  const breadcrumbs = [
    {
      icon: IconChartLine,
      label: "Performa",
      url: "/perform/account",
    },
    {
      label: "Akun",
    },
  ];

  const metricsConfig = [
    {
      title: "Total GMV",
      metric: "gmv",
      icon: "cart",
      borderColor: "#3818D9",
    },
    {
      title: "Total Komisi",
      metric: "commission",
      icon: "coin",
      borderColor: "#EE8D5B",
    },
    {
      title: "Total Iklan + PPN",
      metric: "ads",
      icon: "ad",
      borderColor: "#2E9",
    },
    {
      title: "Total Pendapatan",
      metric: "income",
      icon: "wallet",
      borderColor: "#2E964C",
    },
  ];


  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md w-full mb-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-3 lg:items-center border-b pb-3">
          <div>
            <h2 className="font-bold text-xl">Data Laporan Akun Studio Live</h2>
            <p className="text-accent/60 text-sm">
              Update Informasi Laporan Akun Studio Live
            </p>
          </div>

          <div className="justify-end">
            <DateRangeFilter
              dateRange={appliedRange}
              onApply={handleApplyDateRange}
              isLoading={isFetching}
            />
          </div>
        </div>
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
          {metricsConfig.map(({ title, metric, icon, borderColor }) => {
            const value = data?.metrics?.[metric]?.total || 0;
            const ratio = data?.metrics?.[metric]?.ratio || 0;

            return (
              <StatCard
                key={metric}
                title={title}
                value={
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-pointer">
                          {formatShort(value)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{formatFull(value)}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                }
                percentage={`${ratio}`}
                trend={ratio >= 0 ? "up" : "down"}
                icon={icon}
                borderColor={borderColor}
                since={formatSince(data?.current_period?.days || 0)}
              />
            );
          })}
        </div>


        {/* Table Section */}
        <PerformTable columns={ColumnAccount} data={data?.list} />
      </div>
    </MainLayout>

  );
}
