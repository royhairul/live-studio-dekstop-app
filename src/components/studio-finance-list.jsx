import { StudioFinanceCard } from "./studio-finance-card";
import PerformTable from "./perform-table";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function StudioFinanceList({ viewMode, data = [] }) {

    const performDetailHostColumn = [
        {
            id: "Studio",
            accessorKey: "studio_name",
            header: "Studio",
            cell: ({ getValue }) => (
                <div className="truncate w-40">{getValue()}</div>
            ),
        },
        {
            id: "GMV",
            accessorKey: "gmv",
            header: "GMV",
            cell: ({ getValue }) => (
                <div className="w-32"><TooltipProvider delayDuration={100}>
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
                </TooltipProvider></div>
            ),
        },
        {
            id: "Total Komisi",
            accessorKey: "commission",
            header: "Total Komisi",
            cell: ({ getValue }) => (
                <div className="w-32"><TooltipProvider delayDuration={100}>
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
                </TooltipProvider></div>
            ),
        },
        {
            id: "Iklan + PPN",
            accessorKey: "ads",
            header: "Iklan + PPN",
            cell: ({ getValue }) => (
                <div className="w-40"><TooltipProvider delayDuration={100}>
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
                </TooltipProvider></div>
            ),
        },
        {
            id: "Aksi",
            accessorKey: "studio_id",
            header: "Aksi",
            cell: ({ getValue }) => (
                <div className="w-36">
                    <Link to={`/perform/studio/detail/${getValue()}`}>
                        <Button className="group bg-green-100 hover:bg-green-200 text-green-900 rounded-md px-4 py-1 text-sm font-semibold">
                            Detail Studio
                            <IconArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
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
