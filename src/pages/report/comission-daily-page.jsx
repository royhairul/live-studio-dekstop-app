import MainLayout from "@/layouts/main-layout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    IconArrowAutofitRight,
    IconArrowAutofitUp,
    IconArrowRight,
    IconCards,
    IconReportAnalytics,
    IconSearch,
    IconShoppingCart,
    IconTable,
} from "@tabler/icons-react";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui/stat-card";
import { StudioFinanceCard } from "@/components/studio-finance-card";
import { Input } from "@/components/ui/input";
import StudioFinanceList from "@/components/studio-finance-list";

export default function ComissionDailyPage() {
    const [studio, setStudio] = useState("studio1");
    const [viewMode, setViewMode] = useState("card");

    const breadcrumbs = [
        {
            icon: IconReportAnalytics,
            label: "Riset",
            url: "/riset/all",
        },
        {
            label: "Riset Produk",
        },
    ];

    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            {/* Action Button */}
            <div className="flex gap-2">
                <div className="flex-1"></div>

                <div className="self-end">
                    <Select value={studio} onValueChange={setStudio}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="studio1">Studio 1</SelectItem>
                            <SelectItem value="studio2">Studio 2</SelectItem>
                            <SelectItem value="studio3">Studio 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
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
            </div>

            <div className=" py-5 px-2 rounded-xl">
                <div className="flex justify-between">
                    <div>
                        <h2 className="font-bold text-2xl">Ringkasan Data</h2>
                        <p className="text-accent/60">Update Informasi Laporan Komisi Setiap Studio Live</p>

                    </div>
                    <div className="flex gap-2">
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

                        <Input
                            icon={<IconSearch />}
                            placeholder="Search..."
                            // value={table.getColumn("name")?.getFilterValue() ?? ""}
                            // onChange={(event) =>
                            //   table.getColumn("name")?.setFilterValue(event.target.value)
                            // }
                            className="max-w-sm bg-white"
                        />
                    </div>

                </div>
                <StudioFinanceList viewMode={viewMode} />
            </div>

        </MainLayout >
    );
}
