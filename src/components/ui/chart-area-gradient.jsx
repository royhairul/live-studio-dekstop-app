import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useState } from "react";

export const description = "An area chart with gradient fill"

const chartConfig = {
  komisi: {
    label: "Komisi",
    color: "var(--color-chart-1)",
  },
  omset: {
    label: "Omset",
    color: "var(--color-chart-2)",
  },
}

export function ChartAreaGradient({ title, data }) {
  const [filter, setFilter] = useState("daily");

  const filteredData = (() => {
    switch (filter) {
      case "daily":
        return data[0]?.daily ?? [];
      case "weekly":
        return data[0]?.weekly ?? [];
      case "yearly":
        return data[0]?.yearly ?? [];
      case "monthly":
      default:
        return data[0]?.monthly ?? [];
    }
  })();

  return (
    <Card className="bg-green-50 text-primary border-green-200">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <CardTitle>Live Chart</CardTitle>
          <CardDescription className={"text-green-800"}>{title}</CardDescription>
        </div>
        <Select onValueChange={setFilter} defaultValue="daily">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter waktu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Harian</SelectItem>
            <SelectItem value="weekly">Mingguan</SelectItem>
            <SelectItem value="monthly">Bulanan</SelectItem>
            <SelectItem value="yearly">Tahunan</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={filteredData}
            margin={{  top: 16, bottom: 8, left: -10, right: 16 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat("id-ID").format(value)
              }
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <defs>
              <linearGradient id="fillKomisi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-komisi)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-komisi)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillOmset" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-omset)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-omset)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="komisi"
              type="natural"
              fill="url(#fillKomisi)"
              stroke="var(--color-komisi)"
            />
            <Area
              dataKey="omset"
              type="natural"
              fill="url(#fillOmset)"
              stroke="var(--color-omset)"
            />
          </AreaChart>
        </ChartContainer>

      </CardContent>
    </Card>
  );
}

