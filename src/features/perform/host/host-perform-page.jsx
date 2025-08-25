import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconChartLine, IconSearch, IconUsersGroup } from "@tabler/icons-react";
import { useState } from "react";
import { differenceInDays, endOfWeek, startOfWeek } from "date-fns";
import axios from "axios";
import { apiEndpoints } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { DatePicker } from "@/components/Datepicker";
import { DataTable } from "@/components/data-table";
import { useHosts } from "../../../pages/host/hooks/useHosts";
import PerformTable from "@/components/perform-table";
import { Link } from "react-router-dom";

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

export default function HostPerformPage() {

    const { data: hosts, refetch } = useHosts();

    const performColumns = [
        {
            accessorKey: "name",
            header: "Nama Host",
            enableGlobalFilter: true,
            cell: ({ row }) => row.original.name,
        },
        {
            accessorKey: "totalDuration",
            header: "Total Durasi",
            cell: ({ row }) => {
                const totalSec = row.original.total_duration;
                const hours = Math.floor(totalSec / 3600);
                const minutes = Math.floor((totalSec % 3600) / 60);
                return `${hours}j ${minutes}m`;
            }
        },
        {
            accessorKey: "totalPaid",
            header: "Total Paid",
            cell: ({ row }) => {
                const value = row.original.total_paid;
                return new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                }).format(value);
            },
        },
        {
            accessorKey: "totalSale",
            header: "Total Sale",
            cell: ({ row }) => {
                const value = row.original.total_sales;
                return new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                }).format(value);
            },
        },
        {
            accessorKey: "action",
            header: "Detail Host",
            cell: ({ row }) => (
                <Link
                    to={`/perform/host/detail/${row.original.id}`}
                >
                    <Button className="group bg-green-100 hover:bg-green-200 text-green-900 hover:cursor-pointer rounded-md px-4 py-1 text-sm font-semibold">
                        Detail Host
                        <IconArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </Link>

            ),
        },
    ];


    const [dateRange, setDateRange] = useState({
        from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
        to: endOfWeek(today, { weekStartsOn: 1 }),
    });

    const [appliedDateRange, setAppliedDateRange] = useState({
        from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
        to: endOfWeek(today, { weekStartsOn: 1 }),     // Minggu
    });
    const { data, isLoading, isError, isFetching, error } = useQuery({
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

            const res = await axios.get(apiEndpoints.perform.host());

            return res.data.data;
        },
    });



    const handleApplyClick = () => {
        setAppliedDateRange(dateRange);
        refetch();
    };
    const breadcrumbs = [
        {
            icon: IconChartLine,
            label: "Performa",
            url: "/perform/host",
        },
        {
            label: "Host",
        },
    ];
    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md w-full">
                <div className="flex justify-between">
                    <div className="">
                        <h2 className="font-bold text-xl">Data Laporan Host Studio Live</h2>
                        <p className="text-accent/60 text-sm">Update Informasi Laporan Pendapatan GMV Host Studio Live</p>
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

                <PerformTable columns={performColumns} data={data} />
            </div>
        </MainLayout>
    );
}
