import { StudioFinanceCard } from "./studio-finance-card";
import { DataTable } from "./data-table";

export default function StudioFinanceList({viewMode}) {
    const performDetailHostColumn = [
        {
            id: "akun",
            accessorKey: "akun",
            header: () => (
                <div className="font-semibold text-accent">
                    <p className="text-center">Nama Akun</p>
                </div>
            ),
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "durasi-live",
            accessorKey: "durasi-live",
            header: () => (
                <div className="font-semibold text-accent">
                    <p className="text-center">Durasi Live</p>
                </div>
            ),
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "pesanan-dibayar",
            accessorKey: "pesanan-dibayar",
            header: () => (
                <div className="font-semibold text-accent">
                    <p className="text-center">Pesanan Dibayar</p>
                </div>
            ),
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
        {
            id: "pesanan-dikirim",
            accessorKey: "pesanan-dikirim",
            header: () => (
                <div className="font-semibold text-accent">
                    <p className="text-center">Pesanan Dikirim</p>
                </div>
            ),
            cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
        },
    ];

    const performDetailHostData = [
        {
            akun: "STUDIO 1",
            "durasi-live": "4 Jam",
            "pesanan-dibayar": "Rp. 4.500.000",
            "pesanan-dikirim": "Rp. 4.000.000",
        },
        {
            akun: "STUDIO 2",
            "durasi-live": "3 Jam",
            "pesanan-dibayar": "Rp. 5.100.000",
            "pesanan-dikirim": "Rp. 4.700.000",
        },
        {
            akun: "STUDIO 3",
            "durasi-live": "2 Jam",
            "pesanan-dibayar": "Rp. 3.900.000",
            "pesanan-dikirim": "Rp. 3.500.000",
        },
    ];

    return (
        <div>
            {viewMode === "card" ? (
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                    <StudioFinanceCard />
                </div>
            ) : (
                <DataTable
                    columns={performDetailHostColumn}
                    data={performDetailHostData}
                />
            )}
        </div>
    );
}
