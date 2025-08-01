import MainLayout from "@/layouts/main-layout";
import { DataTablePinning } from "@/components/data-table-pinning";
import { Button } from "@/components/ui/button";
import { IconReportMoney } from "@tabler/icons-react";
import { DatePicker } from "@/components/Datepicker";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiEndpoints } from "@/config/api";
import axios from "axios";
import { differenceInDays } from "date-fns";
import RevenueCard from "@/components/ui/revenue";
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isValid } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { useStudios } from "@/hooks/studio/useStudios";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const today = new Date();

const getTimeDim = (from, to) => {
  const diffDays = differenceInDays(to, from);
  if (diffDays <= 0) return "1d";
  return `${diffDays}d`;
};

const toLocalDateString = (date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];



export default function FinanceComissionPage() {
  const { studio } = useStudios();
  const [selectedStudioId, setSelectedStudioId] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
    to: endOfWeek(today, { weekStartsOn: 1 }),
  });

  const [appliedDateRange, setAppliedDateRange] = useState({
    from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
    to: endOfWeek(today, { weekStartsOn: 1 }),     // Minggu
  });


  const isValidRange =
    appliedDateRange?.from instanceof Date &&
    appliedDateRange?.to instanceof Date &&
    isValid(appliedDateRange.from) &&
    isValid(appliedDateRange.to);

  const dynamicDateColumns = isValidRange
    ? eachDayOfInterval({
      start: appliedDateRange.from,
      end: appliedDateRange.to,
    }).map((date) => ({
      accessorKey: format(date, "yyyy-MM-dd"),
      header: () => (
        <div className="font-semibold text-center">
          <p>{format(date, "EEEE", { locale: localeID })}</p>
          <p>{format(date, "dd/MM/yyyy")}</p>
        </div>
      ),
      cell: ({ getValue }) =>
        Number(getValue()).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }),
    }))
    : [];

  const columnReportDaily = [
    {
      id: "host",
      accessorKey: "host",
      header: () => <div className=" font-semibold bg-primary text-white rounded-2xl py-3 "><p className="text-center">HOST</p></div>,
      cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },
    {
      id: "omset",
      accessorKey: "omset",
      header: () => <div className=" font-semibold bg-primary text-white rounded-2xl py-3 "><p className="text-center">OMSET</p></div>,
      cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },
    {
      id: "omset-jam",
      accessorKey: "omset-jam",
      header: () => <div className=" font-semibold bg-primary text-white rounded-2xl py-3 "><p className="text-center">OMSET/JAM</p></div>,
      cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    },

    ...dynamicDateColumns,
  ];

  const comissionRevenue = [
    {
      title : "Omset / Jam",
      data : "100.000"
    },
    {
      title : "Hasil Studio 5",
      data : "1.000.000"
    }
  ]

  const colorRevenue = {
    bg : "primary",
    text : "white",
  }
  const { data, isLoading, isError, refetch, isFetching, error } = useQuery({
    queryKey: ["finance-daily-report", appliedDateRange],
    queryFn: async () => {
      const payload = {
        page: 1,
        pageSize: 100,
        orderBy: "",
        sort: "",
        timeDim: getTimeDim(appliedDateRange.from, appliedDateRange.to),
        endDate: toLocalDateString(appliedDateRange.to),
      };
      console.log(payload);
      const res = await axios.post(apiEndpoints.finance.daily(), payload);
      return res.data.data.flatMap((shop) =>
        (shop.reportLive ?? []).map((item) => ({
          name: shop.name,
          ...item,
        }))
      );
    },
  });

  const handleApplyClick = () => {
    console.log("Button Terapkan diklik");
    console.log("Tanggal dipilih:", dateRange.to);
    console.log(data);
    setAppliedDateRange(dateRange);
    refetch();
  };

  const breadcrumbs = [
    {
      icon: IconReportMoney,
      label: "Keuangan",
      url: "/finance/all",
    },
    {
      label: "Laporan Komisi",
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Action Button */}
      <div className="flex gap-2">
        <DatePicker
          withRange="true"
          value={dateRange}
          onChange={setDateRange}
        />
        <Button onClick={handleApplyClick} disabled={isFetching}>
          {isFetching ? "Memuat..." : "Terapkan"}
        </Button>
      </div>


      <div className="flex self-end gap-2">
        <Button>Export</Button>
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

      {/* Loading/Error Handler */}
      {
        isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : isError ? (
          <>
            {console.log(error)}
            <div className="text-center py-8 text-red-500">
              Terjadi kesalahan.
            </div>
          </>
        ) : (
          <DataTablePinning
            columns={columnReportDaily}
            data={data}
            pinning={["host", "omset", "omset-jam"]}
          />
        )
      }

      <RevenueCard
        color={colorRevenue}
        data={comissionRevenue}
      />
    </MainLayout >
  );
}
