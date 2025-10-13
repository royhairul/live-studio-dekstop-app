"use client"

import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    LabelList,
    Tooltip,
} from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { formatShortNoRp, formatFull } from "@/helpers/formatIDR"

const chartConfig = {
    gmv: {
        label: "GMV",
        color: "#3818D9",
    },
    commission: {
        label: "Komisi",
        color: "#EE8D5B",
    },
    ads: {
        label: "Iklan + PPN",
        color: "#2E9",
    },
    income: {
        label: "Pendapatan",
        color: "#2E964C",
    },
}

const CustomCursor = ({ points, height, color }) => {
    if (!points || points.length === 0) return null

    const { x } = points[0]

    return (
        <line
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke={color}
            strokeWidth={2}
            strokeDasharray="5 5"
            opacity={0.8}
            style={{ pointerEvents: 'none' }}
        />
    )
}

const CustomLabel = ({ x, y, value, fillColor }) => {
    if (!value || value === 0) return null

    const displayText = formatShortNoRp(value)
    const paddingX = 4
    const paddingY = 2
    const textWidth = displayText.toString().length * 6
    const textHeight = 14
    const rectWidth = textWidth + paddingX * 2
    const rectHeight = textHeight + paddingY * 2

    return (
        <g transform={`translate(${x - rectWidth / 2}, ${y - rectHeight - 6})`}>
            <rect
                width={rectWidth}
                height={rectHeight}
                rx={6}
                ry={6}
                fill={fillColor}
                opacity={0.85}
            />
            <text
                x={rectWidth / 2}
                y={rectHeight / 2 + 4}
                textAnchor="middle"
                fill="#000"
                fontSize={12}
                fontWeight={500}
            >
                {displayText}
            </text>
        </g>
    )
}

const CustomTooltip = ({ active, payload, label, dataKey }) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload
        const dateFull = item?.dateFull || label
        const value = item?.[dataKey] || 0

        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
                <p className="font-semibold text-gray-700 mb-1">{dateFull}</p>
                <p className="text-gray-600">
                    {chartConfig[dataKey]?.label || "Nilai"}:{" "}
                    <span className="font-medium text-gray-900">
                        {formatFull(value)}
                    </span>
                </p>
            </div>
        )
    }

    return null
}

export function ChartLineLabel({
    dataKey = "gmv",
    chartData = [],
    title = "Grafik Laporan",
}) {
    const color = chartConfig[dataKey]?.color

    return (
        <Card className="bg-white text-gray-800 border-gray-100 h-max relative">
            <CardHeader className="relative z-10">
                <CardTitle className="text-2xl font-semibold text-accent">
                    {chartConfig[dataKey]?.label || title}
                </CardTitle>
            </CardHeader>

            <CardContent className="px-2 sm:p-6 relative z-10">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[350px] w-full relative"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 25, bottom: 0, left: 12, right: 12 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                            strokeOpacity={1}
                        />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tick={{ fill: "#6b7280", fontSize: 12 }}
                        />

                        <YAxis
                            tickFormatter={(value) => formatShortNoRp(value)}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={8}
                            tick={{ fill: "#6b7280", fontSize: 12 }}
                        />

                        {/* Gunakan Tooltip dengan custom cursor */}
                        <Tooltip
                            cursor={<CustomCursor color={color} />}
                            content={<CustomTooltip dataKey={dataKey} />}
                        />

                        <Line
                            dataKey={dataKey}
                            type="monotone"
                            stroke={color}
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{
                                r: 6,
                                fill: color,
                                strokeWidth: 2,
                                stroke: "#fff"
                            }}
                        >
                            <LabelList
                                content={(props) => (
                                    <CustomLabel {...props} fillColor={color} />
                                )}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}