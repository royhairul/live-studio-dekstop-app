import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormLabel,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IconUsersGroup } from "@tabler/icons-react";
import InitialsAvatar from "@/components/initials-avatar";
import StatCard from "@/components/ui/stat-card";
import { DataTable } from "@/components/data-table";

export default function HostDetailPerformPage() {
    const breadcrumbs = [
        {
            icon: IconUsersGroup,
            label: "Host",
            url: "/host/all",
        },
        {
            icon: IconUsersGroup,
            label: "Performa",
            url: "/host/perform",
        },
        {
            label: "Detail Performa",
        },
    ];

    const performDetailHostColumn = [
        {
            id: "akun",
            accessorKey: "akun",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Nama Akun</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "durasi-live",
            accessorKey: "durasi-live",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Durasi Live</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "pesanan-dibayar",
            accessorKey: "pesanan-dibayar",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Pesanan Dibayar</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "pesanan-dikirim",
            accessorKey: "pesanan-dikirim",
            header: () => <div className=" font-semibold text-accent "><p className="text-center">Pesanan Dikirim</p></div>,
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
    ];

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
                    <InitialsAvatar name="John Doe" studio="Studio Alpha" />

                    <div className="grid grid-cols-2 gap-4 flex-grow">
                        <StatCard
                            title="Total Durasi Live"
                            value="Rp. 5.450.000"
                            percentage=""
                            trend="null"
                            since="Jumlah Total Durasi Live"
                            icon="wallet"
                            borderColor="#2E964C"
                        />
                        <StatCard
                            title="Rata - Rata Perhari"
                            value="Rp. 5.450.000"
                            percentage=""
                            trend="null"
                            since="Rata - Rata Perhari Pesanan Dibayar dan Dikirim"
                            icon="wallet"
                            borderColor="#2E964C"
                        />
                        <StatCard
                            title="Total Pesanan Dikirim"
                            value="Rp. 5.450.000"
                            percentage=""
                            trend="null"
                            since="Jumlah Total Pesanan Dikirim"
                            icon="wallet"
                            borderColor="#2E964C"
                        />
                        <StatCard
                            title="Total Pesanan Dibayar"
                            value="Rp. 5.450.000"
                            percentage=""
                            trend="null"
                            since="Jumlah Total Pesanan Dibayar"
                            icon="wallet"
                            borderColor="#2E964C"
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <DataTable columns={performDetailHostColumn} data={performDetailHostData} />
                </div>

            </div>
        </MainLayout>
    );
}
