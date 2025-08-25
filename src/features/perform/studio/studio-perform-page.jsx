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
import { useHosts } from "@/hooks/host/useHosts";
import { DatePicker } from "@/components/Datepicker";

const today = new Date();
export default function StudioPerformPage() {

    const { data: hosts, refetch } = useHosts();
    const [viewMode, setViewMode] = useState("card");
    const [dateRange, setDateRange] = useState({
        from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
        to: endOfWeek(today, { weekStartsOn: 1 }),
    });

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
            {/* Action Button */}
            <div className="flex gap-2">
                <div className="flex-1"></div>

                <div className="flex gap-2 self-end">
                    <DatePicker
                        withRange="true"
                        value={dateRange}
                        onChange={setDateRange}
                    />
                    <Button onClick={handleApplyClick}>
                        Terapkan
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
                <StatCard
                    title="Total GMV"
                    value="Rp. 5.450.000"
                    percentage="2,01"
                    trend="up"
                    icon="cart"
                    borderColor="#3818D9"
                />
                <StatCard
                    title="Komisi dibayar"
                    value="Rp. 5.450.000"
                    percentage="2,01"
                    trend="up"
                    icon="coin"
                    borderColor="#EE8D5B"
                />
                <StatCard
                    title="Komisi belum dibayar"
                    value="Rp. 5.450.000"
                    percentage="2,01"
                    trend="down"
                    icon="speaker"
                    borderColor="#D43B3B"
                />
                <StatCard
                    title="Total Pendapatan"
                    value="Rp. 5.450.000"
                    percentage="2,01"
                    trend="up"
                    icon="wallet"
                    borderColor="#2E964C"
                />
                <StatCard
                    title="Total Iklan + PPN"
                    value="Rp. 5.450.000"
                    percentage="2,01"
                    trend="up"
                    icon="ad"
                    borderColor="#3818D9"
                />
            </div>

            <div className=" py-5 px-2 rounded-xl">
                <div className="flex justify-between">
                    <div>
                        <h2 className="font-bold text-2xl">Ringkasan Data</h2>
                        <p className="text-accent/60">Update Informasi Laporan Komisi Setiap Studio Live</p>

                    </div>
                    <div className="flex justify-end mb-4 gap-2">
                        <button
                            onClick={() => setViewMode("card")}
                            className={`p-2 hover:cursor-pointer hover:bg-accent/10 rounded-lg ${viewMode === "card" ? "bg-gray-200" : ""}`}
                        >
                            <IconCards size={18} />
                        </button>

                        <button
                            onClick={() => setViewMode("table")}
                            className={`p-2 hover:cursor-pointer hover:bg-accent/10 rounded-lg ${viewMode === "table" ? "bg-gray-200" : ""}`}
                        >
                            <IconTable size={18} />
                        </button>
                    </div>

                </div>
                <StudioFinanceList viewMode={viewMode} />
            </div>

        </MainLayout >
    );
}
