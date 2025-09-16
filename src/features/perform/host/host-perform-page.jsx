import MainLayout from "@/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconChartLine } from "@tabler/icons-react";
import PerformTable from "@/components/perform-table";
import { Link } from "react-router-dom";
import { intToHumanTime } from "@/helpers/formatTime";
import useDateRangeQuery from "../hooks/useDateRangeQuery";
import { apiEndpoints } from "@/config/api";
import DateRangeFilter from "../components/DateRangeFilter";
import { getYesterdayRange } from "@/helpers/formatDate";
import { useState } from "react";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function HostPerformPage() {
    const [range] = useState(getYesterdayRange);

    const {
        data,
        isFetching,
        handleApplyDateRange,
    } = useDateRangeQuery({
        queryKey: ["perform-detail-host"],
        url: apiEndpoints.perform.host(),
        range
    });

    const performColumns = [
        {
            accessorKey: "name",
            header: "Nama Host",
            enableGlobalFilter: true,
        },
        {
            accessorKey: "total_duration",
            header: "Total Durasi",
            cell: ({ getValue }) => intToHumanTime(getValue())
        },
        {
            accessorKey: "total_paid",
            header: "Total Pesanan Dibuat",
            cell: ({ getValue }) =>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="cursor-pointer">
                                {formatShort(getValue())}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {formatFull(getValue())}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
        },
        {
            accessorKey: "total_sales",
            header: "Total Pesanan Dikirim",
            cell: ({ getValue }) =>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="cursor-pointer">
                                {formatShort(getValue())}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {formatFull(getValue())}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
        },
        {
            accessorKey: "id",
            header: "Detail Host",
            cell: ({ row }) => (
                <Link to={`/perform/host/detail/${row.original.id}`}>
                    <Button className="group bg-green-100 hover:bg-green-200 text-green-900 hover:cursor-pointer rounded-md px-4 py-1 text-sm font-semibold">
                        Detail Host
                        <IconArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </Link>
            ),
        },
    ];

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
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-3 lg:items-center border-b pb-3">
                    <div>
                        <h2 className="font-bold text-xl">Data Laporan Host Studio Live</h2>
                        <p className="text-accent/60 text-sm">
                            Update Informasi Laporan Pendapatan GMV Host Studio Live
                        </p>
                    </div>
                    <DateRangeFilter
                        onApply={handleApplyDateRange}
                        isLoading={isFetching}
                    />
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <PerformTable columns={performColumns} data={data} />
                </div>
            </div>
        </MainLayout>

    );
}
