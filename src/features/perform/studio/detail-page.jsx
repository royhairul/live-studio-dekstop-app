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
import { DialogTambahData } from "@/components/ui/modal-dialog";
import { usePerformStudioDetail } from "./hooks/usePerformStudioDetail";
import { useParams } from "react-router-dom";

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
    const idStudio = useParams().id;
    const detailStudio = usePerformStudioDetail(idStudio);
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
    const fieldsModalIklan = [
        { name: "akun", type: "select", label: "Akun" },
        { name: "iklan", type: "number", label: "Iklan" },
        { name: "tanggal", type: "date", label: "Tanggal" }
    ]

    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            {/* Action Button */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Title */}
                <div>
                    <h1 className="font-bold text-2xl">Laporan {detailStudio.studioDetail.studio_name}</h1>
                    <p className="text-accent/60">
                        Update Informasi Laporan Komisi {detailStudio.studioDetail.studio_name}
                    </p>
                </div>

                {/* Filter */}
                <div className="flex gap-2 items-center justify-end">
                    <DatePicker
                        withRange={true}
                        value={dateRange}
                        onChange={setDateRange}
                        className="w-full sm:w-auto"
                    />
                    <Button
                        onClick={handleApplyClick}
                        disabled={isFetching}
                    >
                        {isFetching ? "Memuat..." : "Terapkan"}
                    </Button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <StatCard
                    title="Total GMV"
                    value={`Rp. ${detailStudio?.studioDetail?.metrics?.gmv.total.toLocaleString("id-ID") || 0}`}
                    percentage={`${detailStudio?.studioDetail.metrics?.gmv.ratio || 0}`}
                    trend={detailStudio?.studioDetail.metrics?.gmv.ratio >= 0 ? "up" : "down"}
                    icon="cart"
                    borderColor="#3818D9"
                />
                <StatCard
                    title="Komisi dibayar"
                    value={`Rp. ${detailStudio?.studioDetail?.metrics?.commission_paid.total.toLocaleString("id-ID") || 0}`}
                    percentage={`${detailStudio?.studioDetail.metrics?.commission_paid.ratio || 0}`}
                    trend={detailStudio?.studioDetail.metrics?.commission_paid.ratio >= 0 ? "up" : "down"}
                    icon="coin"
                    borderColor="#EE8D5B"
                />
                <StatCard
                    title="Komisi Tertunda"
                    value={`Rp. ${detailStudio?.studioDetail?.metrics?.commission_pending.total.toLocaleString("id-ID") || 0}`}
                    percentage={`${detailStudio?.studioDetail.metrics?.commission_pending.ratio || 0}`}
                    trend={detailStudio?.studioDetail.metrics?.commission_pending.ratio >= 0 ? "up" : "down"}
                    icon="speaker"
                    borderColor="#D43B3B"
                />
                <StatCard
                    title="Total Pendapatan"
                    value={`Rp. ${detailStudio?.studioDetail?.metrics?.income.total.toLocaleString("id-ID") || 0}`}
                    percentage={`${detailStudio?.studioDetail.metrics?.income.ratio || 0}`}
                    trend={detailStudio?.studioDetail.metrics?.income.ratio >= 0 ? "up" : "down"}
                    icon="wallet"
                    borderColor="#2E964C"
                />
                <StatCard
                    title="Total Iklan + PPN"
                    value={`Rp. ${detailStudio?.studioDetail?.metrics?.ads.total.toLocaleString("id-ID") || 0}`}
                    percentage={`${detailStudio?.studioDetail.metrics?.ads.ratio || 0}`}
                    trend={detailStudio?.studioDetail.metrics?.ads.ratio >= 0 ? "up" : "down"}
                    icon="ad"
                    borderColor="#2E9"
                />
            </div>

            {/* Data Table */}
            <div className="mt-6">
                <DataTablePinning
                    columns={ColumnComissionDetail}
                    data={data}
                    pinning={["akun"]}
                    customButton={
                        <DialogTambahData
                            fields={fieldsModalIklan}
                            title="Tambah Iklan + PPN"
                        />
                    }
                />
            </div>
        </MainLayout>
    );

}
