import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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

const chartData = [
  { month: "January", komisi: 186, omset: 80 },
  { month: "February", komisi: 305, omset: 200 },
  { month: "March", komisi: 237, omset: 120 },
  { month: "April", komisi: 73, omset: 190 },
  { month: "May", komisi: 209, omset: 130 },
  { month: "June", komisi: 214, omset: 140 },
  { month: "July", komisi: 214, omset: 140 },
  { month: "August", komisi: 214, omset: 140 },
  { month: "September", komisi: 214, omset: 140 },
  { month: "October", komisi: 214, omset: 140 },
  { month: "November", komisi: 214, omset: 140 },
  { month: "December", komisi: 214, omset: 140 },
]
const dailyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, "0")}:00`,
  komisi: Math.floor(Math.random() * 50) + 10,
  omset: Math.floor(Math.random() * 100) + 50,
}));
const weeklyData = [
  { day: "Monday", komisi: 120, omset: 200 },
  { day: "Tuesday", komisi: 150, omset: 220 },
  { day: "Wednesday", komisi: 170, omset: 190 },
  { day: "Thursday", komisi: 100, omset: 250 },
  { day: "Friday", komisi: 90, omset: 180 },
  { day: "Saturday", komisi: 80, omset: 160 },
  { day: "Sunday", komisi: 60, omset: 140 },
];
const yearlyData = [
  { year: "2021", komisi: 1200, omset: 3500 },
  { year: "2022", komisi: 1500, omset: 4200 },
  { year: "2023", komisi: 1800, omset: 5100 },
  { year: "2024", komisi: 2100, omset: 5800 },
];

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

export function ChartAreaGradient() {

  const [filter, setFilter] = useState("monthly");

  const filteredData = (() => {
    switch (filter) {
      case "daily":
        return dailyData.map((d) => ({
          month: d.hour, // adapt ke key `month` untuk chart
          komisi: d.komisi,
          omset: d.omset,
        }));

      case "weekly":
        return weeklyData.map((d) => ({
          month: d.day, // masih pakai key `month`
          komisi: d.komisi,
          omset: d.omset,
        }));

      case "monthly":
        return chartData;

      case "yearly":
        return yearlyData.map((d) => ({
          month: d.year, // tetap pakai key `month` agar chartnya aman
          komisi: d.komisi,
          omset: d.omset,
        }));

      default:
        return chartData;
    }
  })();


  return (
    <Card className="bg-green-50 text-green-800 border-green-200">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <CardTitle>Live Chart</CardTitle>
          <CardDescription className={"text-primary"}>Nala Nafisa</CardDescription>
        </div>
        <Select onValueChange={setFilter} defaultValue="monthly">
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
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillKomisi" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-komisi)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-komisi)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOmset" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-omset)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-omset)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey="komisi"
              type="natural"
              fill="url(#fillKomisi)"
              fillOpacity={0.4}
              stroke="var(--color-komisi)"
              stackId="a"
            />
            <Area
              dataKey="omset"
              type="natural"
              fill="url(#fillOmset)"
              fillOpacity={0.4}
              stroke="var(--color-omset)"
              stackId="a"
            />

          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">

        </div>
      </CardFooter>
    </Card>
  )
}
