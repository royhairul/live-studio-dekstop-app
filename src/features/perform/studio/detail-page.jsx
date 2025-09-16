"use client";

import MainLayout from "@/layouts/main-layout";
import { IconChartLine } from "@tabler/icons-react";
import StatCard from "@/components/ui/stat-card";
import { apiEndpoints } from "@/config/api";
import { DialogTambahData } from "@/components/ui/modal-dialog";
import { useParams } from "react-router-dom";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import { formatPercentage, getPercentageACOS, getPercentageROAS } from "@/helpers/formatPercent";
import DateRangeFilter from "../components/DateRangeFilter";
import useDateRangeQuery from "../hooks/useDateRangeQuery";
import React, { useState } from "react";
import PerformTable from "@/components/perform-table";
import { formatSince, getYesterdayRange } from "@/helpers/formatDate";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function StudioPerformDetailPage() {
    const [range] = useState(getYesterdayRange);
    const idStudio = useParams().id;
    const {
        data,
        isFetching,
        handleApplyDateRange,
    } = useDateRangeQuery({
        queryKey: ["perform-studio-detail", idStudio],
        url: apiEndpoints.perform.studioDetail(idStudio),
        id: idStudio,
        range
    });    

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
            accessorKey: "account_name",
            header: "Nama Akun",
            cell: ({ getValue }) => <div >{getValue()}</div>,
        },
        {
            id: "gmv",
            accessorKey: "gmv",
            header: "GMV",
            cell: ({ getValue }) => <TooltipProvider delayDuration={100}>
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
            </TooltipProvider>,
        },
        {
            id: "komisi",
            accessorKey: "commission",
            header: "Komisi",
            cell: ({ getValue }) => <TooltipProvider delayDuration={100}>
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
            </TooltipProvider>,
        },
        {
            id: "iklan",
            accessorKey: "ads",
            header: "Iklan + PPN",
            cell: ({ getValue }) => <TooltipProvider delayDuration={100}>
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
            </TooltipProvider>,
        },
        {
            id: "acos",
            accessorKey: "acos",
            header: "ACOS",
            cell: ({ getValue }) => <div className={`${getPercentageACOS(getValue())} w-max`} >{formatPercentage(getValue())}</div>,
        }, {
            id: "roas",
            accessorKey: "roas",
            header: "ROAS",
            cell: ({ getValue }) => <div className={`${getPercentageROAS(getValue())} w-max`}>{formatPercentage(getValue())}</div>,
        }, {
            id: "income",
            accessorKey: "income",
            header: "Pendapatan",
            cell: ({ getValue }) => <TooltipProvider delayDuration={100}>
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
            </TooltipProvider>,
        },
    ]
    const fieldsModalIklan = [
        { name: "accountid", type: "select", label: "Akun" },
        { name: "ads", type: "number", label: "Iklan" },
        { name: "date", type: "date", label: "Tanggal" }
    ]

    const accountOptions = data?.list?.map((item) => ({
        value: item.account_id,
        label: item.account_name,
    }));

    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            {/* Action Button */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Title */}
                <div>
                    <h1 className="font-bold text-2xl">Laporan {data?.studio_name}</h1>
                    <p className="text-accent/60">
                        Update Informasi Laporan Komisi {data?.studio_name}
                    </p>
                </div>

                {/* Filter */}
                <div className="flex gap-2 items-center justify-end">
                    <DateRangeFilter
                        onApply={handleApplyDateRange}
                        isLoading={isFetching}
                    />
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <StatCard
                    title="Total GMV"
                    value={
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="cursor-pointer">
                                        {formatShort(data?.metrics?.gmv.ratio || 0)}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {formatFull(data?.metrics?.gmv.ratio || 0)}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    }
                    percentage={`${data?.metrics?.gmv.ratio || 0}`}
                    trend={data?.metrics?.gmv.ratio >= 0 ? "up" : "down"}
                    icon="cart"
                    borderColor="#3818D9"
                    since={formatSince(data?.current_period?.days)}
                />
                <StatCard
                    title="Total Komisi"
                    value={
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="cursor-pointer">
                                        {formatShort(data?.metrics?.commission?.ratio || 0)}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {formatFull(data?.metrics?.commission?.ratio || 0)}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    }
                    percentage={`${data?.metrics?.commission?.ratio || 0}`}
                    trend={data?.metrics?.commission?.ratio >= 0 ? "up" : "down"}
                    icon="coin"
                    borderColor="#EE8D5B"
                    since={formatSince(data?.current_period?.days)}
                />
                <StatCard
                    title="Total Iklan + PPN"
                    value={
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="cursor-pointer">
                                        {formatShort(data?.metrics?.ads.ratio || 0)}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {formatFull(data?.metrics?.ads.ratio || 0)}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    }
                    percentage={`${data?.metrics?.ads.ratio || 0}`}
                    trend={data?.metrics?.ads.ratio >= 0 ? "up" : "down"}
                    icon="ad"
                    borderColor="#2E9"
                    since={formatSince(data?.current_period?.days)}
                />
                <StatCard
                    title="Total Pendapatan"
                    value={
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="cursor-pointer">
                                        {formatShort(data?.metrics?.income?.ratio || 0)}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {formatFull(data?.metrics?.income?.ratio || 0)}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    }
                    percentage={`${data?.metrics?.income?.ratio || 0}`}
                    trend={data?.metrics?.income?.ratio >= 0 ? "up" : "down"}
                    icon="wallet"
                    borderColor="#2E964C"
                    since={formatSince(data?.current_period?.days)}
                />
            </div>

            {/* Data Table */}
            <div className="mt-6">

                <PerformTable
                    columns={ColumnComissionDetail}
                    data={data?.list}
                    customButton={
                        <DialogTambahData
                            fields={fieldsModalIklan}
                            title="Tambah Iklan + PPN"
                            endpoint={apiEndpoints.ads.create}
                            queryInvalidateKey={["perform-studio"]}
                            selectOptions={{ accountid: accountOptions }}
                        />
                    }
                />
            </div>
        </MainLayout>
    );

}
