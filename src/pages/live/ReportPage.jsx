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
import {
  IconBadge,
  IconDots,
  IconHelp,
  IconIdBadge,
  IconReportMoney,
} from "@tabler/icons-react";
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
    id: "hostname",
    accessorKey: "hostname",
    header: () => (
      <div className="pl-4 py-1 px-2 bg-primary text-white rounded-lg flex gap-2 text-sm items-center">
        Nama Host
      </div>
    ),
    cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
  },
  {
    id: "omset",
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="py-1 px-2 bg-primary text-white rounded-lg flex gap-2 text-sm items-center">
            Omset
            <IconHelp size={14} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[150px]">
          <p className="p-1 text-xs">Total omset dalam satu sesi</p>
        </TooltipContent>
      </Tooltip>
    ),
    accessorKey: "omset",
    cell: ({ getValue }) => (
      <span className="text-xs font-semibold">{getValue()}</span>
    ),
  },
  {
    id: "oph",
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="py-1 px-2 bg-primary text-white rounded-lg flex gap-2 text-sm items-center">
            Omset/jam
            <IconHelp size={14} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[150px]">
          <p className="p-1 text-xs">Rerata omset per jam dalam satu sesi</p>
        </TooltipContent>
      </Tooltip>
    ),
    accessorKey: "omset",
    cell: ({ getValue }) => (
      <span className="text-xs font-semibold">{getValue()}</span>
    ),
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
    accessorKey: "viewers",
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
    accessorKey: "total_viewers",
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

export default function LiveReportPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(), // hari ini default
    to: new Date(),
  });

  const getTimeDim = (from, to) => {
    return `${differenceInDays(to, from)}d`;
  };

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["finance-daily-report", dateRange],
    queryFn: async () => {
      const payload = {
        page: 1,
        pageSize: 100,
        orderBy: "",
        sort: "",
        timeDim: getTimeDim(
          dateRange.from.toISOString().split("T")[0],
          dateRange.to.toISOString().split("T")[0]
        ),
        startDate: dateRange.from.toISOString().split("T")[0],
        endDate: dateRange.to.toISOString().split("T")[0],
      };

      console.log("📦 Payload request:", payload);
      const res = await axios.post(apiEndpoints.finance.daily(), {
        page: 1,
        pageSize: 100,
        orderBy: "",
        sort: "",
        timeDim: getTimeDim(
          dateRange.from.toISOString().split("T")[0],
          dateRange.to.toISOString().split("T")[0]
        ),
        endDate: dateRange.to.toISOString().split("T")[0],
      });

      console.log(res);
      return res.data.data.flatMap((shop) =>
        shop.reportLive.list.map((item) => ({
          name: shop.name,
          ...item,
        }))
      );
    },
  });

  const handleApplyClick = () => {
    console.log("Button Terapkan diklik");
    console.log("Tanggal dipilih:", dateRange);
    refetch();
  };

  const breadcrumbs = [
    {
      icon: IconIdBadge,
      label: "Live",
    },
    {
      label: "Laporan",
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Loading/Error Handler */}
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : isError ? (
        <div className="text-center py-8 text-red-500">Terjadi kesalahan.</div>
      ) : (
        <DataTablePinning
          columns={columnReportDaily}
          data={data}
          pinning={["hostname", "omset", "oph"]}
        />
      )}
    </MainLayout>
  );
}
