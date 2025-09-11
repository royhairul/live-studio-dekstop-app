import PerformTable from "@/components/perform-table";
import { DialogTambahData } from "@/components/ui/modal-dialog";
import { apiEndpoints } from "@/config/api";
import formatIDR from "@/helpers/formatIDR";
import MainLayout from "@/layouts/main-layout";
import { IconChartLine, IconSquareRoundedCheckFilled, IconTargetArrow } from "@tabler/icons-react";
import { MonthYearSelect } from "@/components/ui/mont-year-select";
import { Button } from "@/components/ui/button";
import useMonthYearQuery from "../hooks/useMonthYearQuery";



export default function TargetPage() {

  const {
    data,
    handleApplyMonthYear,
    appliedPeriod
  } = useMonthYearQuery({
    queryKey: ["target-studio"],
    url: apiEndpoints.target.getAll(),
  });

  const performColumns = [
    {
      accessorKey: "studio_name",
      header: "Studio",
      cell: ({ row }) => {
        return (
          <div className="p-3 bg-primary/20 rounded-lg w-fit">
            {row.original.studio_name}
          </div>
        );
      },
    },
    // Contoh membuat cell component yang lebih compact untuk sticky columns
    {
      accessorKey: "gmv",
      header: "GMV",
      cell: ({ row }) => {
        const target = row.original.gmv.target;
        const realisasi = row.original.gmv.real;
        const persen = row.original.gmv.ratio;

        // Deteksi jika ini adalah pinned column (bisa dengan context atau props)
        const isPinned = row.isPinned || false; // Sesuaikan dengan implementasi Anda

        if (isPinned) {
          // Versi compact untuk pinned column
          return (
            <div className="space-y-1 text-xs">
              <div className="text-red-600 font-medium">{formatIDR(target)}</div>
              <div className="text-green-600 font-medium">
                {formatIDR(realisasi)} <span className="text-gray-500">({persen.toFixed(1)}%)</span>
              </div>
            </div>
          );
        }

        // Versi lengkap untuk unpinned column
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <IconTargetArrow className="text-red-500 w-4 h-4 flex-shrink-0" />
              <span className="truncate">{formatIDR(target)}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconSquareRoundedCheckFilled className="text-green-500 w-4 h-4 flex-shrink-0" />
              <span className="truncate">{formatIDR(realisasi)}</span>
              <span className="text-sm text-gray-500 flex-shrink-0">({persen.toFixed(1)}%)</span>
            </div>
          </div>
        );
      },
    },
    // Contoh membuat cell component yang lebih compact untuk sticky columns
    {
      accessorKey: "pendapatan",
      header: "Pendapatan",
      cell: ({ row }) => {
        const target = row.original.income.target;
        const realisasi = row.original.income.real;
        const persen = row.original.income.ratio;

        // Deteksi jika ini adalah pinned column (bisa dengan context atau props)
        const isPinned = row.isPinned || false; // Sesuaikan dengan implementasi Anda

        if (isPinned) {
          // Versi compact untuk pinned column
          return (
            <div className="space-y-1 text-xs">
              <div className="text-red-600 font-medium">{formatIDR(target)}</div>
              <div className="text-green-600 font-medium">
                {formatIDR(realisasi)} <span className="text-gray-500">({persen.toFixed(1)}%)</span>
              </div>
            </div>
          );
        }

        // Versi lengkap untuk unpinned column
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <IconTargetArrow className="text-red-500 w-4 h-4 flex-shrink-0" />
              <span className="truncate">{formatIDR(target)}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconSquareRoundedCheckFilled className="text-green-500 w-4 h-4 flex-shrink-0" />
              <span className="truncate">{formatIDR(realisasi)}</span>
              <span className="text-sm text-gray-500 flex-shrink-0">({persen.toFixed(1)}%)</span>
            </div>
          </div>
        );
      },
    },
  ];

  const fieldsTambahTarget = [
    { name: "studio_id", type: "select", label: "Studio" },
    { name: "date", type: "monthyear", label: "Bulan & Tahun" },
    { name: "target_gmv", type: "number", label: "Target GMV" },
    { name: "target_income", type: "number", label: "Target Pendapatan" },
  ]

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

  const studioOptions = data?.map((item) => ({
    value: Number(item.studio_id),
    label: item.studio_name,
  }));


  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-3 lg:items-center pb-3">
          <div >
            <h2 className="font-bold text-xl">Data Laporan Akun Studio Live</h2>
            <p className="text-accent/60 text-sm">Update Informasi Laporan Akun Studio Live</p>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <MonthYearSelect onChange={handleApplyMonthYear} value={appliedPeriod} />
            <Button onClick={() => handleApplyMonthYear(appliedPeriod)}>Terapkan</Button>
          </div>
        </div>

        <PerformTable columns={performColumns} data={data}
          customButton={<DialogTambahData
            title="Tambah Target"
            fields={fieldsTambahTarget}
            endpoint={apiEndpoints.target.create}
            queryInvalidateKey={["targets"]}
            selectOptions={{ studio_id: studioOptions }}
          />
          } />
      </div>
    </MainLayout>
  );
}
