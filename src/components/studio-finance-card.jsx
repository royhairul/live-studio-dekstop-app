import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { IconArrowRight } from "@tabler/icons-react";

export function StudioFinanceCard({
    studioName = "STUDIO 1",
    total = "Rp. 2.300.000",
    gmv = "Rp. 2.300.000",
    komisi = "Rp. 2.300.000",
    detailUrl = "#/perform/studio/detail/1",
}) {
    return (
        <div className="flex-col gap-2 w-full bg-foreground justify-end rounded-xl border-gray-200 border-1 overflow-hidden shadow-lg">
            <Card className="bg-foreground rounded-none shadow-none">
                <CardHeader className="justify-between items-start -mb-3">
                    <h3 className="text-primary bg-green-200 font-bold text-sm px-2 py-1.5 rounded-lg">
                        {studioName}
                    </h3>
                </CardHeader>

                <CardContent>
                    <p className="text-accent/60 font-bold">Total Pendapatan</p>
                    <p className="font-bold text-2xl text-accent mb-2">{total}</p>

                    <div className="w-full p-3 rounded-lg bg-gray-200/50 mb-2">
                        <div className="flex text-xs justify-between w-full mb-2">
                            <p className="font-bold text-accent/60">GMV</p>
                            <p className="font-bold text-accent">{gmv}</p>
                        </div>
                        <hr />
                        <div className="flex text-xs justify-between w-full mt-2">
                            <p className="font-bold text-accent/60">Komisi</p>
                            <p className="font-bold text-accent">{komisi}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CardFooter className="flex gap-2 w-full text-primary bg-green-200 py-2 justify-end">
                <a
                    href={detailUrl}
                    className="group cursor-pointer flex items-center gap-1 text-gray-600 hover:text-primary transition-all duration-200"
                >
                    <p className="text-sm group-hover:font-semibold">Lihat Detail</p>
                    <IconArrowRight
                        width={20}
                        height={20}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </a>
            </CardFooter>
        </div>
    );
}
