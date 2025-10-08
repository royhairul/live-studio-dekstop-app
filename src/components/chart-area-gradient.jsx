import { Area, AreaChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
} from "@/components/ui/chart"
import { formatShortNoRp } from "@/helpers/formatIDR";

const chartConfig = {
  commission: { label: "Komisi", color: "var(--color-chart-1)" },
  gmv: { label: "GMV", color: "var(--color-chart-4)" },
  ads: { label: "Iklan + PPN", color: "var(--color-chart-3)" },
  income: { label: "Pendapatan", color: "var(--color-chart-2)" },
}

const CustomLabel = ({ x, y, value, fillColor }) => {
  if (!value || value === 0) return null // sembunyikan nilai 0

  const displayText = formatShortNoRp(value)
  const paddingX = 4  // padding horizontal
  const paddingY = 2  // padding vertikal
  const textWidth = displayText.toString().length * 6  // perkiraan lebar teks
  const textHeight = 14  // tinggi teks
  const rectWidth = textWidth + paddingX * 2
  const rectHeight = textHeight + paddingY * 2

  return (
    <g transform={`translate(${x - rectWidth / 2}, ${y - rectHeight - 6})`}>
      <rect
        width={rectWidth}
        height={rectHeight}
        rx={4}
        ry={4}
        fill={fillColor}
        stroke={fillColor}
        strokeWidth={0.6}
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

export function ChartAreaGradient({ key , title, data = [], color }) {
  
  return (
    <Card className="bg-white text-gray-800 border-gray-100 h-max">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-accent">
          Grafik Laporan
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data || []}
            margin={{ top: 16, bottom: 16, left: 30, right: 16 }}
          >
            <CartesianGrid vertical={true} strokeDasharray="3 3" stroke="#8884d8" strokeOpacity={0.4} />

            {/* YAxis normal tanpa domain dataMin/dataMax */}
            <YAxis
              tickFormatter={(value) => formatShortNoRp(value)}
              axisLine={false}
              tickLine={true}
              tickMargin={4}
            />

            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              interval={4}
              tick={{ textAnchor: "start" }}
            />

            {/* Area dengan nilai langsung ditampilkan */}
            <Area
              dataKey="gmv"
              type="monotone"
              strokeWidth={2.5}
              fill="url(#fillGmv)"
              stroke="var(--color-gmv)"
            >
              <LabelList content={(props) => <CustomLabel {...props} fillColor={chartConfig.gmv.color} />} />
            </Area>

            <Area
              dataKey="commission"
              type="monotone"
              strokeWidth={2.5}
              fill="url(#fillKomisi)"
              stroke={chartConfig.commission.color}
            >
              <LabelList content={(props) => <CustomLabel {...props} fillColor={chartConfig.commission.color} />} />
            </Area>
            <Area
              dataKey="ads"
              type="monotone"
              strokeWidth={2.5}
              fill="url(#fillAds)"
              stroke={chartConfig.ads.color}
            >
              <LabelList content={(props) => <CustomLabel {...props} fillColor={chartConfig.ads.color} />} />
            </Area>
            <Area
              dataKey="income"
              type="monotone"
              strokeWidth={2.5}
              fill="url(#fillIncome)"
              stroke={chartConfig.income.color}
            >
              <LabelList content={(props) => <CustomLabel {...props} fillColor={chartConfig.income.color} />} />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
