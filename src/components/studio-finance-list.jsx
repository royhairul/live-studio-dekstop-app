import { StudioFinanceCard } from "./studio-finance-card";
import { DataTable } from "./data-table";
import PerformTable from "./perform-table";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

export default function StudioFinanceList({ viewMode }) {
    const performDetailHostColumn = [
        {
            id: "studio",
            accessorKey: "studio",
            header: () => (
                <div className="font-semibold text-accent">
                    <p className="">Studio</p>
                </div>
            ),
            cell: ({ getValue }) => <div className="">{getValue()}</div>,
        },
        {
            id: "gmv",
            accessorKey: "gmv",
            header: () => (
                <div className="font-semibold text-accent">
                    <p className="">Total GMV</p>
                </div>
            ),
            cell: ({ getValue }) => <div className="">{getValue()}</div>,
        },
        {
            id: "komisi",
            accessorKey: "komisi",
            header: () => (
                <div className="font-semibold text-accent">
                    <p className="">Total Komisi</p>
                </div>
            ),
            cell: ({ getValue }) => <div className="">{getValue()}</div>,
        },
        {
            id: "iklan",
            accessorKey: "iklan",
            header: () => (
                <div className="font-semibold text-accent">
                    <p className="">Total Iklan + PPN</p>
                </div>
            ),
            cell: ({ getValue }) => <div className="">{getValue()}</div>,
        },
        {
            accessorKey: "action",
            header: "Detail Studio",
            cell: ({ row }) => (
                <Link
                    to={`/perform/studio/detail/${row.original.id}`}
                >
                    <Button className="group bg-green-100 hover:bg-green-200 text-green-900 hover:cursor-pointer rounded-md px-4 py-1 text-sm font-semibold">
                        Detail Studio
                        <IconArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </Link>
            ),
        },
    ];

    const performDetailHostData = [
        {
            "id": "1",
            "studio": "STUDIO 1",
            "gmv": "Rp. 10.000.000",
            "komisi": "Rp. 4.500.000",
            "iklan": "Rp. 4.000.000",
        },
        {
            "id": "2",
            "studio": "STUDIO 2",
            "gmv": "Rp. 10.000.000",
            "komisi": "Rp. 5.100.000",
            "iklan": "Rp. 4.700.000",
        },
        {
            "id": "3",
            "studio": "STUDIO 3",
            "gmv": "Rp. 10.000.000",
            "komisi": "Rp. 3.900.000",
            "iklan": "Rp. 3.500.000",
        },
    ];

    return (
        <div className="mt-5">
            {viewMode === "card" ? (
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                    <StudioFinanceCard />
                </div>
            ) : (
                <PerformTable columns={performDetailHostColumn} data={performDetailHostData} />
            )}
        </div>
    );
}
