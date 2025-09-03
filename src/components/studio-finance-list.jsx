import { StudioFinanceCard } from "./studio-finance-card";
import PerformTable from "./perform-table";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

export default function StudioFinanceList({ viewMode, data = [] }) {
    const performDetailHostColumn = [
        {
            id: "studio_name",
            accessorKey: "studio_name",
            header: () => (
                <div className="font-semibold text-accent">
                    <p>Studio</p>
                </div>
            ),
            cell: ({ getValue }) => <div>{getValue()}</div>,
        },
        {
            id: "gmv",
            accessorKey: "gmv",
            header: () => (
                <div className="font-semibold text-accent">
                    <p>Total GMV</p>
                </div>
            ),
            cell: ({ getValue }) => (
                <div>{`Rp. ${Number(getValue()).toLocaleString("id-ID")}`}</div>
            ),
        },
        {
            id: "commission",
            accessorKey: "commission",
            header: () => (
                <div className="font-semibold text-accent">
                    <p>Total Komisi</p>
                </div>
            ),
            cell: ({ getValue }) => (
                <div>{`Rp. ${Number(getValue()).toLocaleString("id-ID")}`}</div>
            ),
        },
        {
            id: "ads",
            accessorKey: "ads",
            header: () => (
                <div className="font-semibold text-accent">
                    <p>Total Iklan + PPN</p>
                </div>
            ),
            cell: ({ getValue }) => (
                <div>{`Rp. ${Number(getValue()).toLocaleString("id-ID")}`}</div>
            ),
        },
        {
            accessorKey: "action",
            header: "Detail Studio",
            cell: ({ row }) => (
                <Link to={`/perform/studio/detail/${row.original.studio_id}`}>
                    <Button className="group bg-green-100 hover:bg-green-200 text-green-900 rounded-md px-4 py-1 text-sm font-semibold">
                        Detail Studio
                        <IconArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        <div className="mt-5">
            {viewMode === "card" ? (
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                    {data.map((studio) => (
                        <StudioFinanceCard key={studio.studio_id} data={studio} />
                    ))}
                </div>
            ) : (
                <PerformTable columns={performDetailHostColumn} data={data} />
            )}
        </div>
    );
}
