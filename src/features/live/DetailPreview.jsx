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
        id: "title",
        accessorKey: "title",
        header: () => <div className="pl-4 pr-8 font-semibold">Produk/Harga Jual</div>,
        cell: ({ getValue, row }) => {
            const fullTitle = getValue()
            const shortTitle =
                fullTitle.length > 20 ? fullTitle.substring(0, 20) + "..." : fullTitle

            const minPrice = row.original.minPrice
            const maxPrice = row.original.maxPrice
            const formattedPrice =
                minPrice === maxPrice
                    ? `Rp${minPrice.toLocaleString("id-ID")}`
                    : `Rp${minPrice.toLocaleString("id-ID")} - Rp${maxPrice.toLocaleString("id-ID")}`

            return (
                <div className="pl-4 flex items-center gap-3 group">
                    {/* Thumbnail */}
                    <img
                        src={`https://down-id.img.susercontent.com/file/${row.original.coverImage}`}
                        alt={fullTitle}
                        className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                    />

                    {/* Text content */}
                    <div className="relative flex flex-col">
                        {/* Short title with hover tooltip */}
                        <span className="text-sm font-medium text-gray-800 leading-tight">
                            {shortTitle}
                        </span>

                        {/* Price */}
                        <span className="text-xs text-gray-500">
                            {formattedPrice}
                        </span>

                        {/* Tooltip */}
                        <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded-md px-2 py-1 -top-8 left-0 whitespace-nowrap z-50">
                            {fullTitle}
                        </div>
                    </div>
                </div>
            )
        },
    },
    {
        id: "ctr",
        accessorKey: "ctr",
        header: () => <div className="pl-4 pr-8 font-semibold">CTR</div>,
        cell: ({ getValue }) => (
            <div className="pl-4">{(getValue() * 100).toFixed(1)}%</div>
        ),
    },
    {
        id: "ordersCreated",
        accessorKey: "ordersCreated",
        header: () => <div className="pl-4 pr-8 font-semibold">Pesanan</div>,
        cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },
    {
        id: "confirmedOrderCnt",
        accessorKey: "confirmedOrderCnt",
        header: () => <div className="pl-4 pr-8 font-semibold">Orders Paid</div>,
        cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },
    {
        id: "revenue",
        accessorKey: "revenue",
        header: () => <div className="pl-4 pr-8 font-semibold">Revenue</div>,
        cell: ({ getValue }) => (
            <div className="pl-4">Rp {getValue()?.toLocaleString("id-ID")}</div>
        ),
    },
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

        // === 2️⃣ BUAT KONEKSI WEBSOCKET ===
        const ws = new WebSocket(url);
        socketRef.current = ws;

        ws.onopen = () => {
            console.log("✅ WebSocket Connected to", url);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("📦 Raw object from WebSocket:", data);

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

        return () => {
            console.log("🧹 Cleaning up WebSocket...");
            ws.close();
        };
    }, [location.pathname, id, sessionId]);

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
                        data={reports?.products?.list || []}
                        pinning={["name"]}
                    />
                </div>
            </div>

        </MainLayout>
    );
}
