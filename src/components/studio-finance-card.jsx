import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function StudioFinanceCard({ data }) {

    return (
        <div className="flex-col gap-2 w-full bg-foreground justify-end rounded-xl border-gray-200 border-1 overflow-hidden shadow-lg">
            <Card className="bg-foreground rounded-none shadow-none">
                <CardHeader className="justify-between items-start -mb-3">
                    <h3 className="text-primary bg-green-200 font-bold text-sm px-2 py-1.5 rounded-lg">
                        {data?.studio_name}
                    </h3>
                </CardHeader>

                <CardContent>
                    <p className="text-accent/60 font-bold">Total Pendapatan</p>
                    <p className="font-bold text-2xl text-accent mb-2">
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="cursor-pointer">
                                        {formatShort(data?.income || 0)}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {formatFull(data?.income || 0)}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </p>

                    <div className="w-full p-3 rounded-lg bg-gray-200/50 mb-2">
                        <div className="flex text-xs justify-between w-full mb-2">
                            <p className="font-bold text-accent/60">GMV</p>
                            <p className="font-bold text-accent">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="cursor-pointer">
                                                {formatShort(data?.gmv || 0)}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {formatFull(data?.gmv || 0)}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </p>
                        </div>
                        <hr />
                        <div className="flex text-xs justify-between w-full my-2">
                            <p className="font-bold text-accent/60">Komisi</p>
                            <p className="font-bold text-accent">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="cursor-pointer">
                                                {formatShort(data?.commission || 0)}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {formatFull(data?.commission || 0)}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </p>
                        </div>
                        <hr />
                        <div className="flex text-xs justify-between w-full mt-2">
                            <p className="font-bold text-accent/60">Iklan + PPN</p>
                            <p className="font-bold text-accent">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="cursor-pointer">
                                                {formatShort(data?.ads || 0)}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {formatFull(data?.ads || 0)}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CardFooter className="flex gap-2 w-full text-primary bg-green-200 py-2 justify-end">
                <Link
                    to={`/perform/studio/detail/${data?.studio_id}`}
                    className="group cursor-pointer flex items-center gap-1 text-gray-600 hover:text-primary transition-all duration-200"
                >
                    <p className="text-sm group-hover:font-semibold">Lihat Detail</p>
                    <IconArrowRight
                        width={20}
                        height={20}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
            </CardFooter>
        </div>
    );
}

