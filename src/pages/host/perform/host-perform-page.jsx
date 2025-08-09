import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSearch, IconUsersGroup } from "@tabler/icons-react";
import { useState } from "react";
import { differenceInDays, endOfWeek, startOfWeek } from "date-fns";
import axios from "axios";
import { apiEndpoints } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { DatePicker } from "@/components/Datepicker";
import { DataTable } from "@/components/data-table";
import { useHosts } from "../hooks/useHosts";
import { de } from "date-fns/locale";

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
    const [selectedStudioId, setSelectedStudioId] = useState("all");

    const performHostColumn = [
        {
            id: "nama",
            accessorKey: "nama",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Nama</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "durasi",
            accessorKey: "durasi",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Total Durasi</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "sale",
            accessorKey: "sale",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Total Sale</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "paid",
            accessorKey: "paid",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Total Paid</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "detail",
            accessorKey: "detail",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Detail</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
    ]
    const performHostData = [
        {
            id: "1",
            nama: "Host 1",
            durasi: "08:00:00",
            sale: "Rp. 1.000.000",
            paid: "Rp. 200.000",
        },
        {
            id: "2",
            nama: "Host 2",
            durasi: "08:00:00",
            sale: "Rp. 1.000.000",
            paid: "Rp. 200.000",
        },
        {
            id: "3",
            nama: "Host 3",
            durasi: "08:00:00",
            sale: "Rp. 1.000.000",
            paid: "Rp. 200.000",
        },
    ]

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
            icon: IconUsersGroup,
            label: "Host",
            url: "/host/all",
        },
        {
            label: "Performa",
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

                <DataTable columns={performHostColumn} data={performHostData} />
            </div>
        </MainLayout>
    );
}
