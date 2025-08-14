import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { DataTablePinning } from "@/components/data-table-pinning";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconBadge,
  IconBarrierBlock,
  IconDots,
  IconHelp,
  IconIdBadge,
  IconReportMoney,
} from "@tabler/icons-react";
import { ChartAreaGradient } from "@/components/ui/chart-area-gradient";
import RevenueCard from "@/components/ui/revenue";
import { useStudios } from "@/hooks/studio/useStudios";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function LiveGraphReportPage() {
  const { studio } = useStudios();
  const [dailyReport, setDailyReport] = useState("today");
  const [sortBy, setSortBy] = useState("most-view");
  const [selectedStudioId, setSelectedStudioId] = useState("all");
  const breadcrumbs = [
    {
      icon: IconIdBadge,
      label: "Live",
    },
    {
      label: "Grafik",
    },
  ];

  const hostsData = [
    {
      id: "1",
      name: "likeashy.id",
      monthly: [
        { label: "Jan", komisi: 120 , omset: 100},
        { label: "Feb", komisi: 90 , omset: 200},
        { label: "Mar", komisi: 140 , omset: 100},
        { label: "Apr", komisi: 100 , omset: 90},
        { label: "May", komisi: 130 , omset: 32},
        { label: "Jun", komisi: 150 , omset: 42},
        { label: "Jul", komisi: 160 , omset: 123},
        { label: "Aug", komisi: 140 , omset: 42},
        { label: "Sep", komisi: 120 , omset: 55},
        { label: "Oct", komisi: 170 , omset: 11},
        { label: "Nov", komisi: 180 , omset: 32},
        { label: "Dec", komisi: 200 , omset: 43},
      ],
      weekly: [
        { label: "Mon", komisi: 30 , omset: 77},
        { label: "Tue", komisi: 50 , omset: 90},
        { label: "Wed", komisi: 40 , omset: 80},
        { label: "Thu", komisi: 60 , omset: 100},
        { label: "Fri", komisi: 70 , omset: 32},
        { label: "Sat", komisi: 55 , omset: 321},
        { label: "Sun", komisi: 45 , omset: 12},
      ],
      daily: Array.from({ length: 24 }, (_, i) => ({
        label: `${i}:00`,
        komisi: Math.floor(Math.random() * 20) + 5,
        omset : Math.floor(Math.random() * 20) + 5
      })),
      yearly: [
        { label: "2021", komisi: 1200 ,omset: 3500},
        { label: "2022", komisi: 1350 ,omset: 4200},
        { label: "2023", komisi: 1420 ,omset: 5100},
        { label: "2024", komisi: 1600 ,omset: 5800},
      ],
      revenue: "1.808.080",
      omset: "1.680.000",
      komisi: "1.680.000",
    },
    {
      id: "2",
      name: "omovidi.id",
      monthly: [
        { label: "Jan", komisi: 100, omset: 80 },
        { label: "Feb", komisi: 110, omset: 200 },
        { label: "Mar", komisi: 130, omset: 120 },
        { label: "Apr", komisi: 150, omset: 190 },
        { label: "May", komisi: 120, omset: 130 },
        { label: "Jun", komisi: 140, omset: 140 },
        { label: "Jul", komisi: 160, omset: 140 },
        { label: "Aug", komisi: 170, omset: 140 },
        { label: "Sep", komisi: 180, omset: 140 },
        { label: "Oct", komisi: 190, omset: 140 },
        { label: "Nov", komisi: 210, omset: 140 },
        { label: "Dec", komisi: 230, omset: 140 },
      ],
      weekly: [
        { label: "Mon", komisi: 40 , omset: 200},
        { label: "Tue", komisi: 60 , omset: 220},
        { label: "Wed", komisi: 50 , omset: 190},
        { label: "Thu", komisi: 70 , omset: 250},
        { label: "Fri", komisi: 90 , omset: 180},
        { label: "Sat", komisi: 65 , omset: 160},
        { label: "Sun", komisi: 55 , omset: 140},
      ],
      daily: Array.from({ length: 24 }, (_, i) => ({
        label: `${i}:00`,
        komisi: Math.floor(Math.random() * 25) + 10,
        omset: Math.floor(Math.random() * 25) + 10
      })),
      yearly: [
        { label: "2021", komisi: 1500 , omset: 3500},
        { label: "2022", komisi: 1600 , omset: 4200},
        { label: "2023", komisi: 1700 , omset: 5100},
        { label: "2024", komisi: 1900 , omset: 5800},
      ],
      revenue: "2.000.000",
      omset: "1.800.000",
      komisi: "1.600.000",
    },
  ];

  const colorRevenue = {
    bg: "white",
    text: "background",
  }

  const [selectedAccountId, setSelectedAccountId] = useState("1");
  const selectedAccount = hostsData.find(acc => acc.id === selectedAccountId);

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Semua Studio</h1>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Label className={"text-sm text-primary font-semibold"}>
              Daily Report
            </Label>
            <Select value={dailyReport} onValueChange={setDailyReport}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="yesterday">Kemarin</SelectItem>
                <SelectItem value="week">7 Hari Yang Lalu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className={"text-sm text-primary font-semibold"}>
              Studio
            </Label>
            <Select
              value={selectedStudioId}
              onValueChange={(value) => setSelectedStudioId(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Studio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Studio</SelectItem>
                {studio.map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className={"text-sm text-primary font-semibold"}>
              Sort By
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-view">Most View</SelectItem>
                <SelectItem value="most-transaction">
                  Most Transaction
                </SelectItem>
                <SelectItem value="most-omset">Most Omset</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <ChartAreaGradient title={selectedAccount.name} data={[selectedAccount]} />
      <div className="flex gap-4 overflow-auto py-5">
        <RevenueCard
        color={colorRevenue}
        data={[
          { title: "Hasil Live", data: selectedAccount.revenue },
          { title: "Omset", data: selectedAccount.omset },
          { title: "Komisi", data: selectedAccount.komisi },
        ]}
      />

      <CardHeader className="items-center pb-0 bg-accent-foreground shadow-xl w-full max-w-1/5 rounded-2xl text-accent">
        <CardTitle className={"mt-3"}>List Host</CardTitle>
        <CardDescription className="text-xs w-full mt-2">
          {hostsData.map((account) => (
            <div
              key={account.id}
              onClick={() => setSelectedAccountId(account.id)}
              className={`cursor-pointer transition-all duration-150 flex gap-2 py-3 px-2 w-min -ml-2 my-2 items-center rounded-2xl ${selectedAccountId === account.id
                ? "bg-[#6ffa9648] text-primary"
                : "text-background hover:bg-muted/30"
                }`}
            >
              <div className="w-3 h-3 rounded-full bg-chart-5"></div>
              <p className="font-bold">{account.name}</p>
            </div>
          ))}
        </CardDescription>

      </CardHeader>
      
      </div>

    </MainLayout>
  );
}
