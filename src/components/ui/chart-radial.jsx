"use client"

import { useState } from "react"
import { RadialBar, RadialBarChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    IconArrowLeftDashed,
    IconArrowRightDashed,
} from "@tabler/icons-react"

// Daftar dataset
const dataSetList = [
    {
        title: "Jenis Kelamin",
        keyName: "jenis",
        data: [
            { key: "other", visitors: 90, fill: "var(--color-chart-5)" },
            { key: "perempuan", visitors: 200, fill: "var(--color-chart-2)" },
            { key: "laki", visitors: 275, fill: "var(--color-chart-1)" },
        ],
        config: {
            other: { label: "Tidak diketahui", color: "var(--color-chart-5)" },
            perempuan: { label: "Perempuan", color: "var(--color-chart-2)" },
            laki: { label: "Laki-Laki", color: "var(--color-chart-1)" },
        },
    },
    {
        title: "Status Akun",
        keyName: "status",
        data: [
            { key: "aktif", visitors: 120, fill: "var(--color-chart-1)" },
            { key: "nonaktif", visitors: 60, fill: "var(--color-chart-2)" },
        ],
        config: {
            aktif: { label: "Aktif", color: "var(--color-chart-1)" },
            nonaktif: { label: "Nonaktif", color: "var(--color-chart-2)" },
        },
    },
]

export function ChartRadialSimple() {
    const [activeIndex, setActiveIndex] = useState(0)
    const current = dataSetList[activeIndex]

    const handleNext = () =>
        setActiveIndex((prev) => (prev + 1) % dataSetList.length)
    const handlePrev = () =>
        setActiveIndex((prev) => (prev - 1 + dataSetList.length) % dataSetList.length)

    return (
        <Card className="bg-white w-full max-w-2xs">
            <CardHeader className="items-center pb-0 text-accent">
                <div className="flex gap-4 items-center justify-center mb-3 ">
                    <button onClick={handlePrev} className="hover:cursor-pointer">
                        <IconArrowLeftDashed />
                    </button>
                    <CardTitle>{current.title}</CardTitle>
                    <button onClick={handleNext} className="hover:cursor-pointer">
                        <IconArrowRightDashed />
                    </button>
                </div>

                <CardDescription className="text-xs space-y-1">
                    {current.data.map((item) => (
                        <div key={item.key} className="flex gap-4">
                            <div
                                className="w-3 h-3 mt-0.5 rounded-full"
                                style={{ backgroundColor: item.fill }}
                            />
                            <p>{current.config[item.key].label}</p>
                            <p>{item.visitors}</p>
                        </div>
                    ))}
                </CardDescription>
            </CardHeader>

            <CardContent className="p-0 -mt-10">
                <ChartContainer
                    config={current.config}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={current.data}
                        innerRadius={20}
                        outerRadius={90}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent hideLabel nameKey="key" />
                            }
                        />
                        <RadialBar dataKey="visitors" background />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
