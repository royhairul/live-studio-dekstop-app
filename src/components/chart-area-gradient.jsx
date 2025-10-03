import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  commission: {
    label: "Komisi",
    color: "var(--color-chart-1)",
  },
  gmv: {
    label: "GMV",
    color: "var(--color-chart-4)",
  },
  ads: {
    label: "Iklan + PPN",
    color: "var(--color-chart-3)",
  },
  income: {
    label: "Pendapatan",
    color: "var(--color-chart-2)",
  },
}

export function ChartAreaGradient({ data }) {
  const allTicks = Array.from(
    new Set(data.flatMap(item => [item.gmv, item.commission, item.ads, item.income]))
  ).sort((a, b) => a - b);

  return (
    <Card className="bg-white text-gray-800 border-gray-100 h-max">
      <CardHeader >
        <CardTitle className={"text-2xl font-semibold text-accent"}>Grafik Laporan</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data || []}
            margin={{ top: 16, bottom: 16, left: 30, right: 16 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#8884d8" strokeOpacity={0.4} />

            <YAxis
              ticks={allTicks}
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => new Intl.NumberFormat("id-ID").format(value)}
              axisLine={false}
              tickLine={true}
              tickMargin={0}
            />

            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              interval={9}
              tick={{ textAnchor: "start" }}
            />

            <ChartTooltip
              cursor={false}
              active={true}
              content={<ChartTooltipContent />}
            />

            <defs>
              <linearGradient id="fillGmv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-gmv)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-gmv)" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillKomisi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-commission)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-commission)" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillAds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-ads)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-ads)" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="gmv"
              type="bump"
              strokeWidth={3}
              fill="url(#fillGmv)"
              stroke="var(--color-gmv)"
            />
            <Area
              dataKey="commission"
              type="bump"
              strokeWidth={3}
              fill="url(#fillKomisi)"
              stroke="var(--color-commission)"
            />
            <Area
              dataKey="ads"
              type="bump"
              strokeWidth={3}
              fill="url(#fillAds)"
              stroke="var(--color-ads)"
            />
            <Area
              dataKey="income"
              type="bump"
              strokeWidth={3}
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
            />

          </AreaChart>
        </ChartContainer>

      </CardContent>
    </Card>
  );
}

