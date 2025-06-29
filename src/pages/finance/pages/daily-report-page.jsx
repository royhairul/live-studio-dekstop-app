import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { DataTablePinning } from "@/components/data-table-pinning";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconDots, IconHelp, IconReportMoney } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from "@/components/Datepicker";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiEndpoints } from "@/config/api";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { differenceInDays, format } from "date-fns";

const columnReportDaily = [
  {
    id: "name",
    accessorKey: "name",
    header: () => <div className="pl-4 pr-8 font-semibold">Akun</div>,
    cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
  },
  {
    id: "date",
    header: () => <div className="font-semibold">Waktu Sesi</div>,
    accessorKey: "startTime",
    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "duration",
    header: "Durasi",
    cell: ({ getValue }) => {
      const ms = getValue();
      // const seconds = Math.floor(ms / 1000) % 60;
      const minutes = Math.floor(ms / (1000 * 60)) % 60;
      const hours = Math.floor(ms / (1000 * 60 * 60));

      if (minutes == 0) {
        return `${hours} jam`;
      } else {
        return `${hours} jam ${minutes} menit`;
      }
    },
  },
  {
    header: "Judul",
    accessorKey: "title",
    cell: ({ getValue }) => (
      <span className="text-xs font-semibold">{getValue()}</span>
    ),
  },
  {
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex gap-2 text-xs items-center">
            Penonton Aktif
            <IconHelp size={14} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[150px]">
          <p className="p-1 text-xs">
            Penonton Livestream lebih dari 1 menit dalam periode yang tertentu.
          </p>
        </TooltipContent>
      </Tooltip>
    ),
    accessorKey: "engagedUv",
  },
  {
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex gap-2 text-xs items-center">
            Total Penonton
            <IconHelp size={14} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[150px]">
          <p>Jumlah total Penonton</p>
        </TooltipContent>
      </Tooltip>
    ),
    accessorKey: "viewers",
  },
  {
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex gap-2 text-xs items-center">
            ATC
            <IconHelp size={14} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[150px]">
          <p className="p-1 text-xs">Jumlah klik ke dalam keranjang.</p>
        </TooltipContent>
      </Tooltip>
    ),
    accessorKey: "atc",
    cell: ({ getValue }) => (
      <span className="text-xs font-semibold">{getValue()}</span>
    ),
  },
  {
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex gap-2 text-xs items-center">
            Pesanan
            <IconHelp size={14} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[150px]">
          <p className="p-1 text-xs">
            Jumlah pesanan dari sesi Livestream yang mencakup pesanan non-COD
            yang telah dibayar dan pesanan COD yang telah dikonfirmasi untuk
            pengiriman (termasuk pesanan yang dibatalkan dan dikembalikan).
          </p>
        </TooltipContent>
      </Tooltip>
    ),
    accessorKey: "confirmedOrders",
    cell: ({ getValue }) => (
      <span className="text-xs font-semibold">{getValue()}</span>
    ),
  },
  {
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex gap-2 text-xs items-center">
            Produk Terjual
            <IconHelp size={14} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[150px]">
          <p className="p-1 text-xs">
            Jumlah produk dalam periode yang dipilih dari semua sesi Livestream
            mencakup transaksi dalam 7 hari setelah mengklik tautan produk di
            Livestream.
          </p>
        </TooltipContent>
      </Tooltip>
    ),
    accessorKey: "confirmedItemSold",
    cell: ({ getValue }) => (
      <span className="text-xs font-semibold">{getValue()}</span>
    ),
  },

  {
    accessorKey: "placedSales",
    header: "Sales",
    cell: ({ getValue }) =>
      Number(getValue()).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }),
  },
  {
    accessorKey: "confirmedSales",
    header: "Paid",
    cell: ({ getValue }) =>
      Number(getValue()).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function FinanceDailyReportPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(), // hari ini default
    to: new Date(),
  });

  const getTimeDim = (from, to) => {
    const diffDays = differenceInDays(to, from);
    if (diffDays <= 0) return "1d";
    return `${diffDays}d`;
  };

  const toLocalDateString = (date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

  const [appliedDateRange, setAppliedDateRange] = useState(dateRange);

  const { data, isLoading, isError, refetch, isFetching, error } = useQuery({
    queryKey: ["finance-daily-report", appliedDateRange],
    queryFn: async () => {
      const payload = {
        page: 1,
        pageSize: 100,
        orderBy: "",
        sort: "",
        timeDim: getTimeDim(appliedDateRange.from, appliedDateRange.to),
        endDate: toLocalDateString(appliedDateRange.to),
      };
      console.log(payload);
      const res = await axios.post(apiEndpoints.finance.daily(), payload);
      return res.data.data.flatMap((shop) =>
        (shop.reportLive ?? []).map((item) => ({
          name: shop.name,
          ...item,
        }))
      );
    },
  });

  const handleApplyClick = () => {
    console.log("Button Terapkan diklik");
    console.log("Tanggal dipilih:", dateRange.to);
    console.log(data);
    setAppliedDateRange(dateRange);
    refetch();
  };

  const breadcrumbs = [
    {
      icon: IconReportMoney,
      label: "Keuangan",
      url: "/finance/all",
    },
    {
      label: "Laporan Harian",
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Action Button */}
      <div className="flex gap-2">
        <DatePicker
          withRange="true"
          value={dateRange}
          onChange={setDateRange}
        />
        <Button onClick={handleApplyClick} disabled={isFetching}>
          {isFetching ? "Memuat..." : "Terapkan"}
        </Button>
      </div>

      {/* Loading/Error Handler */}
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : isError ? (
        <>
          {console.log(error)}
          <div className="text-center py-8 text-red-500">
            Terjadi kesalahan.
          </div>
        </>
      ) : (
        <DataTablePinning
          columns={columnReportDaily}
          data={data}
          pinning={["name", "date"]}
        />
      )}
    </MainLayout>
  );
}
