import { DatePicker } from "@/components/Datepicker";
import PerformTable from "@/components/perform-table";
import { Button } from "@/components/ui/button";
import { DialogTambahData } from "@/components/ui/modal-dialog";
import { apiEndpoints } from "@/config/api";
import { useHosts } from "@/hooks/host/useHosts";
import MainLayout from "@/layouts/main-layout";
import { IconBarrierBlock, IconChartLine, IconShoppingBag } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { differenceInDays, endOfWeek, startOfWeek } from "date-fns";
import { useState } from "react";

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

export default function TargetPage() {

  const performColumns = [
    {
      accessorKey: "name",
      header: "Studio",
      enableGlobalFilter: true,
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "gmv",
      header: "Target GMV",
      cell: ({ row }) => {
        const value = row.original.target_gmv;
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(value);
      },
    },
    {
      accessorKey: "pendapatan",
      header: "Target Pendapatan",
      cell: ({ row }) => {
        const value = row.original.target_pendapatan;
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(value);
      },
    },
    {
      accessorKey: "realisasi",
      header: "Realisasi",
      cell: ({ row }) => {
        const value = row.original.realisasi;
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(value);
      },
    }
  ];

  const fieldsTambahTarget = [
    { name: "studio", type: "select", label: "Studio" },
    { name: "tanggal", type: "month", label: "Tanggal" },
    { name: "gmv", type: "number", label: "Target GMV" },
    { name: "pendapatan", type: "number", label: "Target Pendapatan" },
  ]


  const [dateRange, setDateRange] = useState({
    from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
    to: endOfWeek(today, { weekStartsOn: 1 }),
  });

  const [appliedDateRange, setAppliedDateRange] = useState({
    from: startOfWeek(today, { weekStartsOn: 1 }), // Senin
    to: endOfWeek(today, { weekStartsOn: 1 }),     // Minggu
  });

  const { data, isLoading, isError, isFetching, error } = useQuery({
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

      const res = await axios.get(apiEndpoints.perform.host());

      return res.data.data;
    },
  });

  const { data: hosts, refetch } = useHosts();


  const handleApplyClick = () => {
    setAppliedDateRange(dateRange);
    refetch();
  };

  const breadcrumbs = [
    {
      icon: IconChartLine,
      label: "Performa",
      url: "/perform/target",
    },
    {
      label: "Target",
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-3 lg:items-center pb-3">
          <div >
            <h2 className="font-bold text-xl">Data Laporan Akun Studio Live</h2>
            <p className="text-accent/60 text-sm">Update Informasi Laporan Akun Studio Live</p>
          </div>
          <div className="flex gap-2 justify-end">
            <DatePicker
              withRange="true"
              value={dateRange}
              onChange={setDateRange}
            />
            <Button onClick={handleApplyClick} disabled={isFetching}>
              {isFetching ? "Memuat..." : "Terapkan"}
            </Button>
          </div>
        </div>

        <PerformTable columns={performColumns} data={data} customButton={<DialogTambahData title="Tambah Target Studio" fields={fieldsTambahTarget}/>} />
      </div>
    </MainLayout>
  );
}
