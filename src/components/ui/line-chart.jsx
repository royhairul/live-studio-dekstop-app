import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A multiple line chart"

const chartData = [
    { month: "January", revenue: 186, order: 80 },
    { month: "February", revenue: 305, order: 200 },
    { month: "March", revenue: 237, order: 120 },
    { month: "April", revenue: 73, order: 190 },
    { month: "May", revenue: 209, order: 130 },
    { month: "June", revenue: 214, order: 140 },
]

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--color-chart-1)",
    },
    order: {
        label: "Order Create",
        color: "var(--color-chart-2)",
    },
}

export function ChartLineMultiple() {
    return (
        <Card className="bg-white w-full max-w-2xs flex-col justify-evenly">
            <CardHeader>
                <CardTitle className="-mt-5 mb-3 text-2xl font-semibold text-accent">Revenue Trend</CardTitle>
                <CardDescription className="text-xs flex gap-10">
                    <div className="flex gap-1 items-center">
                        <div className="w-4 h-3 rounded-full bg-chart-1"></div>
                        <p>Revenue</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <div className="w-4 h-3 rounded-full bg-chart-2"></div>
                        <p>Order Create</p>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#D1D5DB" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="revenue"
                            type="monotone"
                            stroke={chartConfig.revenue.color}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="order"
                            type="monotone"
                            stroke={chartConfig.order.color}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
