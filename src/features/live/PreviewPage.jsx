import MainLayout from "@/layouts/main-layout";
import { DataTablePinning } from "@/components/data-table-pinning";
import {
  IconArrowRight,
  IconCircleDashedCheck,
  IconCircleDashedMinus,
  IconHelp,
  IconIdBadge,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { apiEndpoints } from "@/config/api";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAccounts } from "@/hooks/account/useAccounts";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const columnReportDaily = [
  {
    id: "host",
    accessorKey: "host",
    header: () => <div className="pl-4 pr-8 font-semibold">Host</div>,
    cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
  },
  {
    id: "studio",
    accessorKey: "studio_name",
    header: () => <div className="pl-4 pr-8 font-semibold">Studio</div>,
    cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
  },
  {
    id: "status",
    header: () => <div className="pl-4 pr-8 font-semibold">Status</div>,
    cell: ({ row }) => (
      <div className="pl-4">
        {row.original.reportLive.length > 0 ? (
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <IconCircleDashedCheck />
            Live
          </Badge>
        ) : (
          <Badge variant="secondary" className="bg-rose-500/10 text-rose-500">
            <IconCircleDashedMinus />
            Off
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "relive",
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex gap-2 text-sm items-center">
            Re-Live
            <IconHelp size={16} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[150px]">
          <p>Jumlah live / session yang dilakukan</p>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => (
      <div className="pl-4">{row.original.reportLive.length}</div>
    ),
  },
  {
    id: "title",
    header: "Judul",
    cell: ({ row }) => row.original.reportLive?.[0]?.title || "-",
  },
  {
    id: "duration",
    header: "Durasi",
    cell: ({ row }) => {
      const ms = row.original.reportLive?.[0]?.duration;

      if (!ms) return "-";
      // const seconds = Math.floor(ms / 1000) % 60;
      const minutes = Math.floor(ms / (1000 * 60)) % 60;
      const hours = Math.floor(ms / (1000 * 60 * 60));

      if (minutes == 0) {
        return `${hours}jam`;
      } else {
        return `${hours}jam ${minutes}menit`;
      }
    },
  },
  {
    id: "total_viewers",
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
    cell: ({ row }) => row.original.reportLive?.[0]?.viewers || "-",
  },
  {
    id: "atc",
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
    cell: ({ row }) => row.original.reportLive?.[0]?.atc || "-",
  },
  {
    id: "orders",
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
    cell: ({ row }) => row.original.reportLive?.[0]?.confirmedOrders || "-",
  },
  {
    id: "sales",
    header: "Sales",
    cell: ({ row }) =>
      row.original.reportLive?.[0]?.placedSales
        ? Number(row.original.reportLive[0].placedSales).toLocaleString(
          "id-ID",
          {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }
        )
        : "-",
  },
  {
    id: "paid",
    header: "Paid",
    cell: ({ row }) =>
      row.original.reportLive?.[0]?.confirmedSales
        ? Number(row.original.reportLive[0].confirmedSales).toLocaleString(
          "id-ID",
          {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }
        )
        : "-",
  },
  {
    id: "oph",
    header: () => <div className="pr-8 font-semibold">Omset Per Jam</div>,
    cell: ({ row }) =>
      row.original.reportLive?.[0]?.omsetPerHour
        ? Number(row.original.reportLive[0].omsetPerHour).toLocaleString(
          "id-ID",
          {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }
        )
        : "-",
  },
  {
    id: "action",
    accessorKey: "action",
    header: "Detail",
    cell: ({ row }) => (
      <Link
        to={`/live/preview-detail/${row.original.name}`}
      >
        <Button className="group bg-green-100 hover:bg-green-200 text-green-900 hover:cursor-pointer rounded-md px-4 py-1 text-sm font-semibold">
          Detail
          <IconArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>

    ),
  },
];

export default function LivePreviewPage() {
  const location = useLocation();
  const socketRef = useRef(null);

  const { data: accounts } = useAccounts();
  const [reports, setReports] = useState({});

  useEffect(() => {
    const ws = new WebSocket(apiEndpoints.live.preview());
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (event) => {
      const realtimeData = JSON.parse(event.data);
      const newReports = {};

      realtimeData.forEach((item) => {
        newReports[item.name] = item.reportLive; // by account name
      });

      setReports((prev) => ({
        ...prev,
        ...newReports, // update data yang baru masuk
      }));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket Closed");
      console.warn(
        "WebSocket Closed, code:",
        event.code,
        "reason:",
        event.reason
      );
    };

    return () => {
      ws.close(); // Cleanup saat unmount
    };
  }, [location.pathname]);

  const combinedData = accounts.map((acc) => ({
    ...acc,
    reportLive: reports[acc.name] || acc.reportLive || [], // real-time jika ada, fallback null/[]
  }));

  const breadcrumbs = [
    {
      icon: IconIdBadge,
      label: "Live Preview",
    }
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <DataTablePinning
        columns={columnReportDaily}
        data={combinedData}
        pinning={["host", "status"]}
      />
    </MainLayout>
  );
}
