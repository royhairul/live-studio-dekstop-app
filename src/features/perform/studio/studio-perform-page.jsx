import MainLayout from "@/layouts/main-layout";
import {
    IconCards,
    IconChartLine,
    IconTable,
} from "@tabler/icons-react";
import { useState } from "react";
import StatCard from "@/components/ui/stat-card";
import StudioFinanceList from "@/components/studio-finance-list";
import Loader from "@/components/ui/loader";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import { apiEndpoints } from "@/config/api";
import useDateRangeQuery from "../hooks/useDateRangeQuery";
import DateRangeFilter from "../components/DateRangeFilter";
import { formatSince, getYesterdayRange } from "@/helpers/formatDate";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function StudioPerformPage() {
    const [viewMode, setViewMode] = useState("card");
    const {
        data: studio,
        isFetching,
        handleApplyDateRange,
        appliedRange
    } = useDateRangeQuery({
        queryKey: ["perform-studio"],
        url: apiEndpoints.perform.studio(),
        range: getYesterdayRange()
    });

    const breadcrumbs = [
        {
            icon: IconChartLine,
            label: "Performa",
            url: "/perform/studio",
        },
        {
            label: "Studio",
        },
    ];

    const metricsConfig = [
        {
            key: "gmv",
            title: "Total GMV",
            icon: "cart",
            borderColor: "#3818D9",
        },
        {
            key: "commission",
            title: "Total Komisi",
            icon: "coin",
            borderColor: "#EE8D5B",
        },
        {
            key: "ads",
            title: "Total Iklan + PPN",
            icon: "ad",
            borderColor: "#2E9",
        },
        {
            key: "income",
            title: "Total Pendapatan",
            icon: "wallet",
            borderColor: "#2E964C",
        },
    ];


    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            {/* Loader muncul kalau masih fetching */}
            {/* {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-accent/10">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-fit flex flex-col items-center justify-center">
                        <Loader />
                        <p className="mt-4 text-gray-600 text-center">Loading...</p>
                    </div>
                </div>
            )} */}

            {/* Action Button */}
            <div className="flex gap-2">
                <div className="flex-1"></div>
                <DateRangeFilter
                    dateRange={appliedRange}
                    onApply={handleApplyDateRange}
                    isLoading={isFetching}
                />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
                {metricsConfig.map(({ key, title, icon, borderColor }) => {
                    const metric = studio?.metrics?.[key] || {};
                    return (
                        <StatCard
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
                            percentage={metric.ratio || 0}
                            trend={metric.ratio >= 0 ? "up" : "down"}
                            icon={icon}
                            borderColor={borderColor}
                            since={formatSince(studio?.current_period?.days || 0)}
                        />
                    );
                })}
            </div>


            {/* Data Ringkasan */}
            <div className="py-5 px-2 rounded-xl">
                <div className="flex justify-between">
                    <div>
                        <h2 className="font-bold text-2xl">Ringkasan Data</h2>
                        <p className="text-accent/60">
                            Update Informasi Laporan Komisi Setiap Studio Live
                        </p>
                    </div>
                    <div className="flex justify-end mb-4 gap-2">
                        <button
                            onClick={() => setViewMode("card")}
                            className={`p-2 hover:cursor-pointer hover:bg-accent/10 rounded-lg ${viewMode === "card" ? "bg-gray-200" : ""
                                }`}
                        >
                            <IconCards size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode("table")}
                            className={`p-2 hover:cursor-pointer hover:bg-accent/10 rounded-lg ${viewMode === "table" ? "bg-gray-200" : ""
                                }`}
                        >
                            <IconTable size={18} />
                        </button>
                    </div>
                </div>
                <StudioFinanceList viewMode={viewMode} data={studio?.list} />
            </div>
        </MainLayout>
    );
}
