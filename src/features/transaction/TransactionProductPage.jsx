import MainLayout from "@/layouts/main-layout";
import { DataTablePinning } from "@/components/data-table-pinning";
import { IconArrowDown, IconArrowUp, IconFilter, IconReportMoney } from "@tabler/icons-react";
import { useState } from "react";
import { apiEndpoints } from "@/config/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatFull, formatShopeeIDR, formatShort } from "@/helpers/formatIDR";
import { getYesterdayRange } from "@/helpers/formatDate";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DateRangeFilter from "@/features/perform/components/DateRangeFilter";
import useDateRangeQuery from "@/features/perform/hooks/useDateRangeQuery";
import { Coins, ShoppingCart } from "lucide-react";
import MetricsSection from "@/components/MetricsSection";
import { useStudios } from "@/hooks/studio/useStudios";
import { useAccounts } from "@/hooks/account/useAccounts";


const columnReportProducts = [
  {
    id: "id",
    accessorKey: "id",
    header: () => <span className="font-semibold">ID Pesanan</span>,
    cell: ({ getValue }) => <div className="pl-2">{getValue()}</div>,
  },
  {
    id: "account_name",
    accessorKey: "account_name",
    header: () => <span className="font-semibold">Nama Akun</span>,
    cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
  },
  // {
  //   id: "tipe_commision",
  //   accessorKey: "tipe_commision",
  //   header: () => <span className="font-semibold">Tipe Komisi</span>,
  //   cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
  // },
  // {
  //   id: "total_purchase",
  //   accessorKey: "total_purchase",
  //   header: ({ column }) => {
  //     const isSorted = column.getIsSorted();
  //     return (
  //       <div
  //         className="flex items-center gap-1 cursor-pointer select-none"
  //         onClick={() => column.toggleSorting(isSorted === "asc")}
  //       >
  //         <span className="font-semibold">Total Pembelian</span>
  //         {isSorted === "asc" ? (
  //           <IconArrowUp size={14} />
  //         ) : isSorted === "desc" ? (
  //           <IconArrowDown size={14} />
  //         ) : (
  //           <IconArrowDown size={14} className="opacity-30" />
  //         )}
  //       </div>
  //     );
  //   },
  //   cell: ({ getValue }) => <div>{formatShopeeIDR(getValue())}</div>,
  //   sortingFn: (rowA, rowB, columnId) => {
  //     const a = Number(rowA.getValue(columnId));
  //     const b = Number(rowB.getValue(columnId));
  //     return a > b ? 1 : a < b ? -1 : 0;
  //   },
  // },
  {
    id: "total_commission",
    accessorKey: "total_commission",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          <span className="font-semibold">Total Komisi</span>
          {isSorted === "asc" ? (
            <IconArrowUp size={14} />
          ) : isSorted === "desc" ? (
            <IconArrowDown size={14} />
          ) : (
            <IconArrowDown size={14} className="opacity-30" />
          )}
        </div>
      );
    },
    cell: ({ getValue }) => <div>{formatShopeeIDR(getValue())}</div>,
    sortingFn: (rowA, rowB, columnId) => {
      const a = Number(rowA.getValue(columnId));
      const b = Number(rowB.getValue(columnId));
      return a > b ? 1 : a < b ? -1 : 0;
    },
  },
  // {
  //   id: "total_commission_with_mcn",
  //   accessorKey: "total_commission_with_mcn",
  //   header: ({ column }) => {
  //     const isSorted = column.getIsSorted();
  //     return (
  //       <div
  //         className="flex items-center gap-1 cursor-pointer select-none"
  //         onClick={() => column.toggleSorting(isSorted === "asc")}
  //       >
  //         <span className="font-semibold">Total Komisi MCN</span>
  //         {isSorted === "asc" ? (
  //           <IconArrowUp size={14} />
  //         ) : isSorted === "desc" ? (
  //           <IconArrowDown size={14} />
  //         ) : (
  //           <IconArrowDown size={14} className="opacity-30" />
  //         )}
  //       </div>
  //     );
  //   },
  //   cell: ({ getValue }) => <div>{formatShopeeIDR(getValue())}</div>,
  //   sortingFn: (rowA, rowB, columnId) => {
  //     const a = Number(rowA.getValue(columnId));
  //     const b = Number(rowB.getValue(columnId));
  //     return a > b ? 1 : a < b ? -1 : 0;
  //   },
  // },
];



const metricsConfig = [
  {
    key: "total_purchase",
    title: "Total Pembelian Yang Dibuat",
    icon: ShoppingCart,
    borderColor: "#3818D9",
    gradient: "from-[#3818D9]/20 via-transparent to-transparent",
    since: "Total Seluruh Komisi",
    withChart: false,
  },
  {
    key: "total_commission_with_mcn",
    title: "Total Komisi Produk",
    icon: Coins,
    borderColor: "#EE8D5B",
    gradient: "from-[#EE8D5B]/20 via-transparent to-transparent",
    since: "Total Seluruh Komisi",
    withChart: false,
  },
  {
    key: "total_commission",
    title: "Total Seluruh Pesanan",
    icon: Coins,
    borderColor: "#2EE59D",
    gradient: "from-[#2EE59D]/20 via-transparent to-transparent",
    since: "Total Seluruh Komisi",
    withChart: false,
  },
];

export default function FinanceDailyReportPage() {
  const [selectedStudio, setSelectedStudio] = useState("all");
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const {
    data,
    isFetching,
    handleApplyDateRange,
    appliedRange,
  } = useDateRangeQuery({
    queryKey: ["perform-studio-detail"],
    url: apiEndpoints.transaction.products(),
    range: getYesterdayRange(),
    extraParams: {
      ...(selectedStatus !== "all" && { status: selectedStatus }),
      ...(selectedStudio !== "all" && { studio: selectedStudio }),
      ...(selectedAccount !== "all" && { account: selectedAccount }),
    },
  });

  // console.log(data);
  

  const breadcrumbs = [
    {
      icon: IconReportMoney,
      label: "Transaksi",
      url: "/transaksi/produk",
    },
    {
      label: "Produk",
    },
  ];

  const { studio: studioList } = useStudios();
  const { data: accountList = [] } = useAccounts();

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Action Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Filter Studio */}
        <div className="flex flex-col">
          <span className="text-xs text-primary font-medium mb-1">Studio</span>
          <Select value={selectedStudio} onValueChange={setSelectedStudio}>
            <SelectTrigger className="w-[150px] h-9 text-sm">
              <SelectValue placeholder="Pilih Studio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Studio</SelectItem>
              {studioList?.map((studio) => (
                <SelectItem key={studio.id} value={studio.id}>
                  {studio.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Akun */}
        <div className="flex flex-col">
          <span className="text-xs text-primary font-medium mb-1">Akun</span>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-[150px] h-9 text-sm">
              <SelectValue placeholder="Pilih Akun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Akun</SelectItem>
              {accountList?.map((acc) => (
                <SelectItem key={acc.unique_id} value={acc.unique_id}>
                  {acc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Filter Status */}
        <div className="flex flex-col">
          <span className="text-xs text-primary font-medium mb-1">Status Pesanan</span>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px] h-9 text-sm">
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Selesai">Pesanan Dibuat</SelectItem>
              <SelectItem value="Pending">Pesanan Dikirim</SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div className="flex flex-1 justify-end">
          <DateRangeFilter
            dateRange={appliedRange}
            onApply={handleApplyDateRange}
            isLoading={isFetching}
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        {metricsConfig.map(({ key, title, icon, borderColor, gradient, since, withChart }) => {
          const metric = data?.metric?.[key] / 100000;
          return (
            <MetricsSection
              key={key}
              title={title}
              value={
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        {formatShort(metric || 0)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {formatFull(metric || 0)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
              icon={icon}
              borderColor={borderColor}
              since={since}
              withChart={withChart}
              data={data?.metrics}
              gradient={gradient}
            />
          );
        })}
      </div>


      {/* Data Table */}
      <DataTablePinning
        columns={columnReportProducts}
        data={data?.list ?? []
          .filter((row) =>
            selectedStatus === "all" ? true : row.status === selectedStatus
          )
          .filter((row) =>
            selectedAccount === "all"
              ? true
              : row.account_name === selectedAccount
          )
          .filter((row) =>
            selectedStudio === "all" ? true : row.studio === selectedStudio
          )}
        pinning={["account_name"]}
      />
    </MainLayout>
  );
}