import MainLayout from "@/layouts/main-layout";

import {
    IconIdBadge,
} from "@tabler/icons-react";

import { ChartRadialSimple } from "@/components/ui/chart-radial";
import { ListCard } from "@/components/list-card";
import { DataTablePinning } from "@/components/data-table-pinning";
import { useAccounts } from "@/hooks/account/useAccounts";
import { useEffect, useRef, useState } from "react";
import { apiEndpoints } from "@/config/api";
import { useLocation } from "react-router-dom";
import { LineChart } from "lucide-react";
import { ChartLineMultiple } from "@/components/ui/line-chart";
import { ur } from "zod/v4/locales";

const columnDetailPreview = [
    {
        id: "name",
        accessorKey: "name",
        header: () => <div className="pl-4 pr-8 font-semibold">Product</div>,
        cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },
    {
        id: "product-im",
        accessorKey: "product-im",
        header: () => <div className="pl-4 pr-8 font-semibold">Product Im</div>,
        cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },
    {
        id: "ctr",
        accessorKey: "ctr",
        header: () => <div className="pl-4 pr-8 font-semibold">CTR</div>,
        cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },
    {
        id: "order-create",
        accessorKey: "order-create",
        header: () => <div className="pl-4 pr-8 font-semibold">Order Create</div>,
        cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },
    {
        id: "order-pad",
        accessorKey: "order-pad",
        header: () => <div className="pl-4 pr-8 font-semibold">Order PAD</div>,
        cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },
    {
        id: "revenue",
        accessorKey: "revenue",
        header: () => <div className="pl-4 pr-8 font-semibold">Revenue</div>,
        cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    }
]
export default function LivePreviewDetailPage() {
    const breadcrumbs = [
        {
            icon: IconIdBadge,
            label: "Live",
            url: "/live/preview",
        },
        {
            label: "Detail",
        },
    ];
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
    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            <div className="w-full overflow-auto flex gap-2">
                <ChartLineMultiple />
                <ListCard />
            </div>
            <div className="flex gap-2 w-full mt-2">
                <ChartRadialSimple />
                <div className="bg-white rounded-xl shadow-xl p-2 w-full overflow-auto">
                    <h2 className="text-lg font-bold -mb-5 text-center">Product List</h2>
                    <DataTablePinning
                        columns={columnDetailPreview}
                        data={combinedData}
                        pinning={["name"]}
                    />
                </div>
            </div>

        </MainLayout>
    );
}
