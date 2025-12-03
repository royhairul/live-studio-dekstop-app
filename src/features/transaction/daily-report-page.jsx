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
import { useAccounts } from "@/hooks/account/useAccounts";
import { useStudios } from "@/hooks/studio/useStudios";


const columnReportPayout = [
  {
    id: "account_name",
    accessorKey: "account_name",
    header: () => <span className="font-semibold">Nama Akun</span>,
    cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
  },
  {
    id: "order_date",
    accessorKey: "order_date",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          <span className="font-semibold text-xs">Tanggal Pemesanan</span>
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
      new Date(getValue()).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    id: "validation_date",
    accessorKey: "validation_date",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          <span className="font-semibold text-xs">Tanggal Validasi</span>
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
      new Date(getValue()).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    id: "commission",
    accessorKey: "commission",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          <span className="font-semibold text-xs">Pencairan</span>
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
  {
    id: "payment_method",
    accessorKey: "payment_method",
    header: ({ column }) => {
      const current = column.getFilterValue();
      const options = [undefined, "Bank Transfer", "ShopeePay"];
      const next = options[(options.indexOf(current) + 1) % options.length];

      return (
        <div
          className="flex flex-col cursor-pointer select-none group"
          onClick={() => column.setFilterValue(next)}
        >
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xs">Metode Pembayaran</span>
            <IconFilter
              size={14}
              className={`transition-all duration-150 ${current ? "text-blue-500" : "opacity-30 group-hover:opacity-60"
                }`}
            />
          </div>

          {current && (
            <span className="text-[10px] text-gray-500 mt-[2px] font-medium">
              {current}
            </span>
          )}
        </div>
      );
    },
    cell: ({ getValue }) => <span>{getValue()}</span>,
    filterFn: (row, id, value) => {
      if (!value) return true;
      if (value === "Bank Transfer")
        return row.getValue(id).includes("Bank Transfer");
      return row.getValue(id) === value;
    },
  },
  {
    id: "payment_date",
    accessorKey: "payment_date",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          <span className="font-semibold text-xs">Tanggal Pembayaran</span>
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
      new Date(getValue()).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    id: "payment_status",
    accessorKey: "payment_status",
    header: () => <span className="font-semibold text-xs">Status Pembayaran</span>,
    cell: ({ getValue }) => {
      const status = getValue();
      const color =
        status === "Selesai"
          ? "text-green-600 bg-green-50"
          : "text-yellow-600 bg-yellow-50";
      return (
        <span
          className={`px-2 py-1 text-xs rounded-lg font-semibold ${color}`}
        >
          {status === "Selesai" ? "Terbayar" : status}
        </span>
      );
    },
  }


];

const metricsConfig = [
  {
    key: "paid",
    title: "Total Komisi Dibayar",
    icon: ShoppingCart,
    borderColor: "#3818D9",
    gradient: "from-[#3818D9]/20 via-transparent to-transparent",
    since: "Total Seluruh Komisi",
    withChart: false,
  },
  {
    key: "pending",
    title: "Total Komisi Belum Dibayar",
    icon: Coins,
    borderColor: "#EE8D5B",
    gradient: "from-[#EE8D5B]/20 via-transparent to-transparent",
    since: "Total Seluruh Komisi",
    withChart: false,
  },
  {
    key: "total",
    title: "Total Seluruh Komisi",
    icon: Coins,
    borderColor: "#2EE59D",
    gradient: "from-[#2EE59D]/20 via-transparent to-transparent",
    since: "Total Seluruh Komisi",
    withChart: true,
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
    queryKey: ["finance-report", selectedStatus, selectedStudio, selectedAccount],
    url: apiEndpoints.transaction.finance(),
    range: getYesterdayRange(),
    extraParams: {
      ...(selectedStatus !== "all" && { status: selectedStatus }),
      ...(selectedStudio !== "all" && { studio: selectedStudio }),
      ...(selectedAccount !== "all" && { account: selectedAccount }),
    },
  });

  console.log("data", data);

  const breadcrumbs = [
    {
      icon: IconReportMoney,
      label: "Transaksi",
      url: "/transaksi/keuangan",
    },
    {
      label: "Keuangan",
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
            <SelectTrigger className="w-34 sm:w-[150px] h-9 text-sm">
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
            <SelectTrigger className="w-34 sm:w-[150px] h-9 text-sm">
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
          <span className="text-xs text-primary font-medium mb-1">Status</span>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-34 sm:w-[150px] h-9 text-sm">
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Sudah Dibayar">Sudah Dibayar</SelectItem>
              <SelectItem value="Menunggu Dibayar">Menunggu Dibayar</SelectItem>
              <SelectItem value="Menunggu Validasi">Sedang Divalidasi</SelectItem>
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
              data={data?.metric}
              gradient={gradient}
            />
          );
        })}
      </div>


      {/* Data Table */}
      <DataTablePinning
        columns={columnReportPayout}
        data={data?.list ?? []
          .filter((row) =>
            selectedStatus === "all" ? true : row.status === selectedStatus
          )
          .filter((row) =>
            selectedAccount === "all"
              ? true
              : row.account_id === selectedAccount
          )
          .filter((row) =>
            selectedStudio === "all" ? true : row.studio === selectedStudio
          )}
        pinning={["account_id"]}
      />
    </MainLayout>
  );
}