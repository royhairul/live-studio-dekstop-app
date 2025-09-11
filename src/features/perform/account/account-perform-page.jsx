import PerformTable from "@/components/perform-table";
import { apiEndpoints } from "@/config/api";
import formatIDR from "@/helpers/formatIDR";
import { formatPercentage, getPercentageACOS, getPercentageROAS } from "@/helpers/formatPercent";
import MainLayout from "@/layouts/main-layout";
import { IconChartLine } from "@tabler/icons-react";
import DateRangeFilter from "../components/DateRangeFilter";
import useDateRangeQuery from "../hooks/useDateRangeQuery";
import { getYesterdayRange } from "@/helpers/formatDate";
import { useState } from "react";


export default function AccountPerformPage() {
  const [range] = useState(getYesterdayRange);

  const {
    data,
    isFetching,
    handleApplyDateRange,
  } = useDateRangeQuery({
    queryKey: ["perform-account"],
    url: apiEndpoints.perform.account(),
    range
  });

  console.log(data);

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
      cell: ({ getValue }) => <div >{formatIDR(getValue())}</div>,
    },
    {
      id: "komisi",
      accessorKey: "commission",
      header: "Komisi",
      cell: ({ getValue }) => <div >{formatIDR(getValue())}</div>,
    },
    {
      id: "iklan",
      accessorKey: "ads",
      header: "Iklan + PPN",
      cell: ({ getValue }) => <div >{formatIDR(getValue())}</div>,
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
      cell: ({ getValue }) => <div >{formatIDR(getValue())}</div>,
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
              onApply={handleApplyDateRange}
              isLoading={isFetching}
            />
          </div>
        </div>

        {/* Table Section */}
        <PerformTable columns={ColumnAccount} data={data} />
      </div>
    </MainLayout>

  );
}
