import MainLayout from "@/layouts/main-layout";
import {
    IconCards,
    IconChartBar,
    IconChartLine,
    IconTable,
} from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui/stat-card";
import StudioFinanceList from "@/components/studio-finance-list";
import { endOfWeek, startOfWeek } from "date-fns";
import { DatePicker } from "@/components/Datepicker";
import { usePerformStudio } from "./hooks/usePerformStudio";
import Loader from "@/components/ui/loader";

const today = new Date();
export default function StudioPerformPage() {

    const { studio, isLoading, refetch } = usePerformStudio();
    const [viewMode, setViewMode] = useState("card");
    const [dateRange, setDateRange] = useState({
        from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
        to: endOfWeek(today, { weekStartsOn: 1 }),
    });
    console.log("ini studio", studio);


    const [appliedDateRange, setAppliedDateRange] = useState({
        from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
        to: endOfWeek(today, { weekStartsOn: 1 }),     // Minggu
    });

    const handleApplyClick = () => {
        setAppliedDateRange(dateRange);
        refetch();
    };
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

    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            {/* Loader muncul kalau masih fetching */}
                { isLoading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-accent/10">
                        <div className="bg-white p-6 rounded-2xl shadow-lg w-fit flex flex-col items-center justify-center">
                            <Loader />
                            <p className="mt-4 text-gray-600 text-center">Loading...</p>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <div className="flex gap-2">
                    <div className="flex-1"></div>
                    <div className="flex gap-2 self-end">
                        <DatePicker
                            withRange="true"
                            value={dateRange}
                            onChange={setDateRange}
                        />
                        <Button onClick={handleApplyClick}>Terapkan</Button>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
                    <StatCard
                        title="Total GMV"
                        value={`Rp. ${studio?.metrics?.gmv.total.toLocaleString("id-ID") || 0}`}
                        percentage={`${studio?.metrics?.gmv.ratio || 0}`}
                        trend={studio?.metrics?.gmv.ratio >= 0 ? "up" : "down"}
                        icon="cart"
                        borderColor="#3818D9"
                    />
                    <StatCard
                        title="Komisi dibayar"
                        value={`Rp. ${studio?.metrics?.commission_paid.total.toLocaleString("id-ID") || 0}`}
                        percentage={`${studio?.metrics?.commission_paid.ratio || 0}`}
                        trend={studio?.metrics?.commission_paid.ratio >= 0 ? "up" : "down"}
                        icon="coin"
                        borderColor="#EE8D5B"
                    />
                    <StatCard
                        title="Komisi Tertunda"
                        value={`Rp. ${studio?.metrics?.commission_pending.total.toLocaleString("id-ID") || 0}`}
                        percentage={`${studio?.metrics?.commission_pending.ratio || 0}`}
                        trend={studio?.metrics?.commission_pending.ratio >= 0 ? "up" : "down"}
                        icon="speaker"
                        borderColor="#D43B3B"
                    />
                    <StatCard
                        title="Total Pendapatan"
                        value={`Rp. ${studio?.metrics?.income.total.toLocaleString("id-ID") || 0}`}
                        percentage={`${studio?.metrics?.income.ratio || 0}`}
                        trend={studio?.metrics?.income.ratio >= 0 ? "up" : "down"}
                        icon="wallet"
                        borderColor="#2E964C"
                    />
                    <StatCard
                        title="Total Iklan + PPN"
                        value={`Rp. ${studio?.metrics?.ads.toLocaleString("id-ID") || 0}`}
                        percentage="—"
                        trend="up"
                        icon="ad"
                        borderColor="#2E9"
                    />
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
