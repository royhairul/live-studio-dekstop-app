import MainLayout from "@/layouts/main-layout";

import {
    IconIdBadge,
} from "@tabler/icons-react";

import { ChartRadialSimple } from "@/components/ui/chart-radial";
import { ListCard } from "@/components/list-card";
import { DataTablePinning } from "@/components/data-table-pinning";
import { useEffect, useRef, useState } from "react";
import { apiEndpoints } from "@/config/api";
import { useLocation, useParams } from "react-router-dom";
import { ChartLineMultiple } from "@/components/ui/line-chart";

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
    const { id, sessionId } = useParams();
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

    const [reports, setReports] = useState({});

    useEffect(() => {
        // === 1️⃣ LOG PARAM DAN URL ===
        console.log("Params:", { id, sessionId });

        const url = apiEndpoints.live.detail(id, sessionId);
        console.log("Connecting to:", url);

        // === 2️⃣ BUAT KONEKSI WEBSOCKET ===
        const ws = new WebSocket(url);
        socketRef.current = ws;

        ws.onopen = () => {
            console.log("✅ WebSocket Connected to", url);
        };

        // === 3️⃣ HANDLE DATA DARI SERVER ===
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("📦 Raw object from WebSocket:", data);

                // Pastikan object valid
                if (!data || !data.name) {
                    console.warn("⚠️ Data tidak valid:", data);
                    return;
                }

                // Update state reports
                setReports(data)

            } catch (err) {
                console.error("❌ JSON parse error:", err, event.data);
            }
        };

        ws.onerror = (error) => {
            console.error("⚠️ WebSocket Error:", error);
        };

        ws.onclose = (event) => {
            console.warn("❌ WebSocket Closed:", event.code, event.reason);
        };

        // === 4️⃣ BERSIHKAN KONEKSI SAAT UNMOUNT ===
        return () => {
            console.log("🧹 Cleaning up WebSocket...");
            ws.close();
        };
    }, [location.pathname, id, sessionId]);

    console.log("🧠 Combined Data:", reports);
    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            <div className="w-full overflow-auto flex gap-2">
                <ChartLineMultiple />
                <ListCard data={reports?.overview} name={reports?.name} />
            </div>
            <div className="flex gap-2 w-full mt-2">
                <ChartRadialSimple />
                <div className="bg-white rounded-xl shadow-xl p-2 w-full overflow-auto">
                    <h2 className="text-lg font-bold -mb-5 text-center">Product List</h2>
                    <DataTablePinning
                        columns={columnDetailPreview}
                        
                        pinning={["name"]}
                    />
                </div>
            </div>

        </MainLayout>
    );
}
