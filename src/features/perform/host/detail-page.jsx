import MainLayout from "@/layouts/main-layout";
import { IconChartBar, IconChartLine, IconShoppingBag, IconShoppingCart } from "@tabler/icons-react";
import InitialsAvatar from "@/components/initials-avatar";
import StatCard from "@/components/ui/stat-card";
import PerformTable from "@/components/perform-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiEndpoints } from "@/config/api";
import { useParams } from "react-router-dom";

export default function HostDetailPerformPage() {
    const id = useParams().id;

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
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "durasi-live",
            accessorKey: "durasi-live",
            header: "Durasi Live",
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "pesanan-dibayar",
            accessorKey: "pesanan-dibayar",
            header: "Pesanan Dibayar",
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "pesanan-dikirim",
            accessorKey: "pesanan-dikirim",
            header: "Pesanan Dikirim",
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
    ];

    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ["perform-detail-host"],
        queryFn: async () => {
            const res = await axios.get(apiEndpoints.perform.hostDetail(id));
            return res.data.data;
        },
    })

    console.log(data);

    const totalMinutes = data?.total_duration || 0;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const performDetailHostData = [
        {
            "akun": "John Doe",
            "durasi-live": "08:00:00",
            "pesanan-dibayar": "1.000.000",
            "pesanan-dikirim": "1.000.000",
        },
        {
            "akun": "John Doe",
            "durasi-live": "08:00:00",
            "pesanan-dibayar": "1.000.000",
            "pesanan-dikirim": "1.000.000",
        },
    ];
    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="">
                    <h2 className="font-bold text-xl">Data Laporan Detail Host</h2>
                    <p className="text-accent/60 text-sm">Update Informasi Laporan Detail Host</p>
                </div>
                <div className="flex w-full gap-4 items-start mt-5 ">
                    <InitialsAvatar name={`${data?.name}` || "Roy"} studio={`${data?.studio || "Studio Ghaib"}`} />

                    <div className="grid grid-cols-2 gap-4 flex-grow">
                        <StatCard
                            title="Total Durasi Live"
                            value={`${hours}:${minutes.toString().padStart(2, "0")} jam`}
                            percentage=""
                            trend="null"
                            since="Jumlah Total Durasi Live"
                            icon="speed"
                            borderColor="#2E964C"
                        />

                        <div style={{ borderBottom: `4px solid #2E964C` }}
                            className="w-full bg-foreground rounded-xl p-4 border-gray-200 border-1 overflow-hidden shadow-lg max-h-[150px]">
                            <div className="flex items-center gap-2 justify-between">
                                <p className="font-bold text-sm text-accent/60">Rata - Rata Perhari</p>
                                <IconChartBar className="w-8 h-8 p-1 rounded-lg" style={{ color: "#2E964C", backgroundColor: "#2E964C22" }} />
                            </div>
                            <div className="p-2 font-semibold text-md shadow-xs rounded-2xl mb-2">
                                <div className="flex justify-around mb-1">
                                    <div className="flex gap-2 -ml-10">
                                        <IconShoppingBag className="w-6 h-6 p-1 rounded-lg" style={{ color: "#2E964C", backgroundColor: "#2E964C22" }} />
                                        <p className="text-accent/60 w-1">Dibayar</p>
                                    </div>
                                    <p>{
                                        new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR'
                                        }).format(data?.avg_paid || 0)
                                    }</p>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex gap-2 -ml-10">
                                        <IconShoppingCart className="w-6 h-6 p-1 rounded-lg" style={{ color: "#2E964C", backgroundColor: "#2E964C22" }} />
                                        <p className="text-accent/60 w-1">Dikirim</p>
                                    </div>
                                    <p>{
                                        new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR'
                                        }).format(data?.avg_sales || 0)
                                    }</p>
                                </div>
                            </div>
                            <p className="text-xs">Rata - Rata Sale dan Paid Perhari</p>
                        </div>

                        <StatCard
                            title="Total Pesanan Dikirim"
                            value={
                                new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(data?.total_sales || 0)
                            }
                            percentage=""
                            trend="null"
                            since="Jumlah Total Pesanan Dikirim"
                            icon="cart"
                            borderColor="#2E964C"
                        />

                        <StatCard
                            title="Total Pesanan Dibayar"
                            value={
                                new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(data?.total_paid || 0)
                            }
                            percentage=""
                            trend="null"
                            since="Jumlah Total Pesanan Dibayar"
                            icon="shopbag"
                            borderColor="#2E964C"
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <PerformTable columns={performDetailHostColumn} data={performDetailHostData} />
                </div>

            </div>
        </MainLayout>
    );
}
