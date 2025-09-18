import MainLayout from "@/layouts/main-layout";
import { IconChartBar, IconChartLine, IconShoppingBag, IconShoppingCart } from "@tabler/icons-react";
import InitialsAvatar from "@/components/initials-avatar";
import StatCard from "@/components/ui/stat-card";
import PerformTable from "@/components/perform-table";
import { apiEndpoints } from "@/config/api";
import { useParams } from "react-router-dom";
import { intToHumanTime } from "@/helpers/formatTime";
import DateRangeFilter from "../components/DateRangeFilter";
import useDateRangeQuery from "../hooks/useDateRangeQuery";
import { getYesterdayRange } from "@/helpers/formatDate";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


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
            return intToHumanTime(totalSec);
        }
    },
    {
        id: "pesanan-dibuat",
        accessorKey: "pesanan-dibuat",
        header: "Pesanan Dibuat",
        cell: ({ row }) => {
            const value = row.original.total_paid;
            return <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="cursor-pointer">
                            {formatShort(value || 0)}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        {formatFull(value || 0)}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        }
    },
    {
        id: "pesanan-dikirim",
        accessorKey: "pesanan-dikirim",
        header: "Pesanan Dikirim",
        cell: ({ row }) => {
            const value = row.original.total_sales;
            return <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="cursor-pointer">
                            {formatShort(value || 0)}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        {formatFull(value || 0)}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        }
    },

];


export default function HostDetailPerformPage() {
    const id = useParams().id;
    const {
        data,
        isFetching,
        handleApplyDateRange,
        appliedRange
    } = useDateRangeQuery({
        queryKey: ["perform-detail-host"],
        url: apiEndpoints.perform.hostDetail(id),
        id,
        range: getYesterdayRange(),
    });

    const totalSeconds = data?.total_duration || 0;

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

                    <DateRangeFilter
                        dateRange={appliedRange}
                        onApply={handleApplyDateRange}
                        isLoading={isFetching}
                    />
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
                            value={intToHumanTime(totalSeconds)}
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
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span className="cursor-pointer">
                                                        {formatShort(data?.avg_paid || 0)}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {formatFull(data?.avg_paid || 0)}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
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
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span className="cursor-pointer">
                                                        {formatShort(data?.avg_sales || 0)}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {formatFull(data?.avg_sales || 0)}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                    </p>
                                </div>
                            </div>
                            <p className="text-xs">Rata - Rata Sale dan Paid Perhari</p>
                        </div>


                        <StatCard
                            title="Total Pesanan Dibuat"
                            value={<TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="cursor-pointer">
                                            {formatShort(data?.total_paid || 0)}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {formatFull(data?.total_paid || 0)}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>}
                            percentage=""
                            trend="null"
                            since="Jumlah Total Pesanan Dibuat"
                            icon="shopbag"
                            borderColor="#2E964C"
                        />

                        <StatCard
                            title="Total Pesanan Dikirim"
                            value={<TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="cursor-pointer">
                                            {formatShort(data?.total_sales || 0)}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {formatFull(data?.total_sales || 0)}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>}
                            percentage=""
                            trend="null"
                            since="Jumlah Total Pesanan Dikirim"
                            icon="cart"
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
