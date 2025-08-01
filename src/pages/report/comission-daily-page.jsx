import MainLayout from "@/layouts/main-layout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    IconArrowAutofitRight,
    IconArrowRight,
    IconReportAnalytics,
} from "@tabler/icons-react";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ComissionDailyPage() {
    const [studio, setStudio] = useState("studio1");

    const breadcrumbs = [
        {
            icon: IconReportAnalytics,
            label: "Riset",
            url: "/riset/all",
        },
        {
            label: "Riset Produk",
        },
    ];

    return (
        <MainLayout breadcrumbs={breadcrumbs}>
            {/* Action Button */}
            <div className="flex gap-2">
                <div className="flex-1"></div>

                <div className="self-end">
                    <Select value={studio} onValueChange={setStudio}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="studio1">Studio 1</SelectItem>
                            <SelectItem value="studio2">Studio 2</SelectItem>
                            <SelectItem value="studio3">Studio 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex">
                <div className="flex-col gap-2 w-full bg-foreground justify-end max-w-2xs rounded-xl border-gray-200 border-1 overflow-hidden shadow-xl ">
                <Card className={"bg-foreground rounded-none shadow-none"}>
                    <CardHeader className="flex flex-col justify-between items-start gap-4">
                        <h3 className="text-primary bg-green-200 font-bold text-sm px-2 py-1.5 rounded-lg">STUDIO 1</h3>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold text-2xl text-accent">Rp. 2.300.000</p>
                        <div className="w-full p-3 rounded-lg bg-gray-200/50 mt-3">
                            <div className="flex text-xs justify-between w-full mb-2">
                                <p className="font-bold text-accent/60">GMV</p>
                                <p className="font-bold text-accent">Rp. 2.300.000</p>
                            </div>
                            <hr />
                            <div className="flex text-xs justify-between w-full mt-2">
                                <p className="font-bold text-accent/60">Komisi</p>
                                <p className="font-bold text-accent">Rp. 2.300.000</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                    <CardFooter className="flex gap-2 w-full text-primary bg-green-200 py-2 justify-end">
                        <Button variant="link">
                        <p>Lihat Detail</p>
                        <IconArrowRight width={24} height={24} />
                        </Button>
                    </CardFooter>
                </div>
            </div>
        </MainLayout>
    );
}
