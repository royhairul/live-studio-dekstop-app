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
import { formatFull, formatShort } from "@/helpers/formatIDR";
import { getYesterdayRange } from "@/helpers/formatDate";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DateRangeFilter from "@/features/perform/components/DateRangeFilter";
import useDateRangeQuery from "@/features/perform/hooks/useDateRangeQuery";
import { Coins, ShoppingCart } from "lucide-react";
import MetricsSection from "@/components/MetricsSection";


const columnReportProducts = [
  {
    id: "id_aff",
    accessorKey: "id_aff",
    header: () => <span className="font-semibold">Rincian Pesanan</span>,
    cell: ({ getValue }) => <div className="pl-2">{getValue()}</div>,
  },
  {
    id: "account_name",
    accessorKey: "account_name",
    header: () => <span className="font-semibold">Informasi Produk</span>,
    cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
  },
  {
    id: "tipe_commision",
    accessorKey: "tipe_commision",
    header: () => <span className="font-semibold">Tipe Komisi</span>,
    cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          <span className="font-semibold">Total Pembelian</span>
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
    cell: ({ getValue }) =>
      Number(getValue()).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }),
    // memastikan sorting numerik, bukan string
    sortingFn: (rowA, rowB, columnId) => {
      const a = Number(rowA.getValue(columnId));
      const b = Number(rowB.getValue(columnId));
      return a > b ? 1 : a < b ? -1 : 0;
    },
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          <span className="font-semibold">Komisi Produk</span>
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
    cell: ({ getValue }) =>
      Number(getValue()).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }),
    // memastikan sorting numerik, bukan string
    sortingFn: (rowA, rowB, columnId) => {
      const a = Number(rowA.getValue(columnId));
      const b = Number(rowB.getValue(columnId));
      return a > b ? 1 : a < b ? -1 : 0;
    },
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          <span className="font-semibold">Komisi Pesanan</span>
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
    cell: ({ getValue }) =>
      Number(getValue()).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }),
    // memastikan sorting numerik, bukan string
    sortingFn: (rowA, rowB, columnId) => {
      const a = Number(rowA.getValue(columnId));
      const b = Number(rowB.getValue(columnId));
      return a > b ? 1 : a < b ? -1 : 0;
    },
  }
];

const metricsConfig = [
  {
    key: "commission_paid",
    title: "Total Pembelian Yang Dibuat",
    icon: ShoppingCart,
    borderColor: "#3818D9",
    gradient: "from-[#3818D9]/20 via-transparent to-transparent",
    since: "Total Seluruh Komisi",
    withChart: false,
  },
  {
    key: "commission_unpaid",
    title: "Total Komisi Produk",
    icon: Coins,
    borderColor: "#EE8D5B",
    gradient: "from-[#EE8D5B]/20 via-transparent to-transparent",
    since: "Total Seluruh Komisi",
    withChart: false,
  },
  {
    key: "commission",
    title: "Total Seluruh Pesanan",
    icon: Coins,
    borderColor: "#2EE59D",
    gradient: "from-[#2EE59D]/20 via-transparent to-transparent",
    since: "Total Seluruh Komisi",
    withChart: false,
  },
];

const payoutData = [
  {
    id_aff: "AFF12345",
    account_name: "ShopeeXpert_01",
    date: "2025-10-01",
    amount: 1250000,
    method: "Bank Transfer - BCA",
    status: "Selesai",
  },
  {
    id_aff: "AFF67890",
    account_name: "PartnerStore_88",
    date: "2025-10-03",
    amount: 890000,
    method: "ShopeePay",
    status: "Pending",
  },
  {
    id_aff: "AFF99881",
    account_name: "CreatorMarket_02",
    date: "2025-09-28",
    amount: 2145000,
    method: "Bank Transfer - Mandiri",
    status: "Gagal",
  },
  {
    id_aff: "AFF43210",
    account_name: "BestDeals_Indo",
    date: "2025-10-05",
    amount: 1560000,
    method: "Bank Transfer - BNI",
    status: "Selesai",
  },
];

export default function FinanceDailyReportPage() {
  const {
    data,
    isFetching,
    handleApplyDateRange,
    appliedRange,
  } = useDateRangeQuery({
    queryKey: ["perform-studio-detail"],
    url: apiEndpoints.transaction.finance(),
    range: getYesterdayRange(),
  });

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

  const [selectedStudio, setSelectedStudio] = useState("all");
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

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
              <SelectItem value="Studio A">Studio A</SelectItem>
              <SelectItem value="Studio B">Studio B</SelectItem>
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
              <SelectItem value="ShopeeXpert_01">ShopeeXpert_01</SelectItem>
              <SelectItem value="PartnerStore_88">PartnerStore_88</SelectItem>
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
          const metric = data?.metrics?.[key] || {};
          return (
            <MetricsSection
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
        data={payoutData
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
        pinning={["id_aff", "account_name"]}
      />
    </MainLayout>
  );
}