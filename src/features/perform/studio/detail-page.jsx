"use client";

import MainLayout from "@/layouts/main-layout";
import { IconChartLine, IconReportAnalytics } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui/stat-card";
import { differenceInDays, endOfWeek, startOfWeek } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiEndpoints } from "@/config/api";
import { DatePicker } from "@/components/Datepicker";
import { DataTablePinning } from "@/components/data-table-pinning";
import { DialogIklan } from "@/components/ui/modal-dialog";

const today = new Date();

const getTimeDim = (from, to) => {
    const diffDays = differenceInDays(to, from);
    if (diffDays <= 0) return "1d";
    return `${diffDays}d`;
};

const toLocalDateString = (date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

export default function StudioPerformDetailPage() {

    const [dateRange, setDateRange] = useState({
        from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
        to: endOfWeek(today, { weekStartsOn: 1 }),
    });

    const [appliedDateRange, setAppliedDateRange] = useState({
        from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
        to: endOfWeek(today, { weekStartsOn: 1 }),     // Minggu
    });

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
        setAppliedDateRange(dateRange);
        refetch();
    };
    const breadcrumbs = [
        {
            icon: IconChartLine,
            label: "Perform",
            url: "/perform/studio",
        },
        {
            label: "Studio",
            url: "/perform/studio",
        },
        {
            label: "Detail",
        },
    ];

    const ColumnComissionDetail = [
        {
            id: "akun",
            accessorKey: "akun",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Nama Akun</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "gmv",
            accessorKey: "gmv",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">GMV</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "komisi-dibayar",
            accessorKey: "komisi-dibayar",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Komisi Dibayar</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "komisi-tertunda",
            accessorKey: "komisi-tertunda",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Komisi Tertunda</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "iklan",
            accessorKey: "iklan",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Iklan + PPN</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "acos",
            accessorKey: "acos",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">ACOS</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        }, {
            id: "roas",
            accessorKey: "roas",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">ROAS</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        }, {
            id: "pendapatan",
            accessorKey: "pendapatan",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Pendapatan</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
    ]

    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            {/* Action Button */}
            <div className="flex justify-between">

                <div>
                    <h1 className="font-bold text-2xl">Laporan Studio 1</h1>
                    <p className="text-accent/60">Update Informasi Laporan Komisi Studio 1 </p>
                </div>

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

            <DataTablePinning columns={ColumnComissionDetail} data={data} pinning={["akun"]} customButton={<DialogIklan />} />
        </MainLayout>
    );
}
