import MainLayout from "@/layouts/main-layout";
import { IconChartBar, IconChartLine, IconShoppingBag, IconShoppingCart } from "@tabler/icons-react";
import InitialsAvatar from "@/components/initials-avatar";
import StatCard from "@/components/ui/stat-card";
import PerformTable from "@/components/perform-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiEndpoints } from "@/config/api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { DatePicker } from "@/components/Datepicker";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";


const breadcrumbs = [
    {
        icon: IconChartLine,
        label: "Performa",
        url: "/perform/host",
    },
    {
        label: "Host",
        url: "/perform/host",
    },
    {
        label: "Detail",
    },
];

const performDetailHostColumn = [
    {
        id: "akun",
        accessorKey: "akun",
        header: "Nama Akun",
        enableGlobalFilter: true,
        cell: ({ row }) => row.original.account_name,
    },
    {
        id: "durasi-live",
        accessorKey: "durasi-live",
        header: "Durasi Live",
        cell: ({ row }) => {
            const totalSec = row.original.duration;
            const hours = Math.floor(totalSec / 3600);
            const minutes = Math.floor((totalSec % 3600) / 60);
            return `${hours}j ${minutes}m`;
        }
    },
    {
        id: "pesanan-dikirim",
        accessorKey: "pesanan-dikirim",
        header: "Pesanan Dikirim",
        cell: ({ row }) => {
            const value = row.original.total_sales;
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(value);
        }
    },
    {
        id: "pesanan-dibuat",
        accessorKey: "pesanan-dibuat",
        header: "Pesanan Dibuat",
        cell: ({ row }) => {
            const value = row.original.total_paid;
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(value);
        }
    },
];


export default function HostDetailPerformPage() {
    const id = useParams().id;
    const [dateRange, setDateRange] = useState(null);
    const [appliedRange, setAppliedRange] = useState(null);

    console.log(appliedRange);

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["perform-detail-host", id, appliedRange?.from, appliedRange?.to],
        queryFn: async () => {
            const params = {};
            if (appliedRange?.from) params.startDate = appliedRange.from;
            if (appliedRange?.to) params.endDate = appliedRange.to;

            const res = await axios.get(apiEndpoints.perform.hostDetail(id), {
                params,
            });
            return res.data.data;
        },
        enabled: !!id,
    });



    const handleApplyClick = () => {
        if (!dateRange?.from || !dateRange?.to) return; 
        setAppliedRange({
            from: dateRange?.from ? formatDate(dateRange.from) : null,
            to: dateRange?.to ? formatDate(dateRange.to) : null,
        });
    };

    const totalMinutes = data?.total_duration || 0;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            <div className="p-4 bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div>
                        <h2 className="font-bold text-xl">Data Laporan Detail Host</h2>
                        <p className="text-accent/60 text-sm">
                            Update Informasi Laporan Detail Host
                        </p>
                    </div>

                    {/* Filter */}
                    <div className="flex gap-2 items-center justify-end">
                        <DatePicker
                            withRange="true"
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

                {/* Avatar + Stats */}
                <div className="flex flex-col lg:flex-row w-full gap-4 items-start mt-5">
                    {/* Avatar */}
                    <div className="flex-shrink-0 flex justify-center w-full lg:w-auto mb-4 lg:mb-0">
                        <InitialsAvatar
                            name={`${data?.name || "Roy"}`}
                            studio={`${data?.studio || "Studio 1"}`}
                        />
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow w-full">
                        <StatCard
                            title="Total Durasi Live"
                            value={`${hours}:${minutes.toString().padStart(2, "0")} jam`}
                            percentage=""
                            trend="null"
                            since="Jumlah Total Durasi Live"
                            icon="speed"
                            borderColor="#2E964C"
                        />

                        <div
                            style={{ borderBottom: `4px solid #2E964C` }}
                            className="w-full bg-foreground rounded-xl p-4 border-gray-200 border-1 overflow-hidden shadow-lg max-h-[150px]"
                        >
                            <div className="flex items-center gap-2 justify-between">
                                <p className="font-bold text-sm text-accent/60">
                                    Rata - Rata Perhari
                                </p>
                                <IconChartBar
                                    className="w-8 h-8 p-1 rounded-lg"
                                    style={{
                                        color: "#2E964C",
                                        backgroundColor: "#2E964C22",
                                    }}
                                />
                            </div>
                            <div className="p-2 font-semibold text-md shadow-xs rounded-2xl mb-2">
                                <div className="flex justify-between mb-1">
                                    <div className="flex gap-2">
                                        <IconShoppingBag
                                            className="w-6 h-6 p-1 rounded-lg"
                                            style={{
                                                color: "#2E964C",
                                                backgroundColor: "#2E964C22",
                                            }}
                                        />
                                        <p className="text-accent/60">Dibuat</p>
                                    </div>
                                    <p>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(data?.avg_paid || 0)}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <IconShoppingCart
                                            className="w-6 h-6 p-1 rounded-lg"
                                            style={{
                                                color: "#2E964C",
                                                backgroundColor: "#2E964C22",
                                            }}
                                        />
                                        <p className="text-accent/60">Dikirim</p>
                                    </div>
                                    <p>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(data?.avg_sales || 0)}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs">Rata - Rata Sale dan Paid Perhari</p>
                        </div>

                        <StatCard
                            title="Total Pesanan Dikirim"
                            value={new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(data?.total_sales || 0)}
                            percentage=""
                            trend="null"
                            since="Jumlah Total Pesanan Dikirim"
                            icon="cart"
                            borderColor="#2E964C"
                        />

                        <StatCard
                            title="Total Pesanan Dibuat"
                            value={new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(data?.total_paid || 0)}
                            percentage=""
                            trend="null"
                            since="Jumlah Total Pesanan Dibuat"
                            icon="shopbag"
                            borderColor="#2E964C"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="mt-5 overflow-x-auto">
                    <PerformTable
                        columns={performDetailHostColumn}
                        data={data?.list}
                    />
                </div>
            </div>
        </MainLayout>
    );

}
