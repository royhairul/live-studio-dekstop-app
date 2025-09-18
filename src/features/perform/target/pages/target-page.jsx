import PerformTable from "@/components/perform-table";
import { DialogTambahData } from "@/components/ui/modal-dialog";
import { apiEndpoints } from "@/config/api";
import MainLayout from "@/layouts/main-layout";
import { IconChartLine, IconSquareRoundedCheckFilled, IconTargetArrow } from "@tabler/icons-react";
import { MonthYearSelect } from "@/components/ui/mont-year-select";
import { Button } from "@/components/ui/button";
import useMonthYearQuery from "../../hooks/useMonthYearQuery";
import { formatFull, formatShort } from "@/helpers/formatIDR";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatPercentage, getPercentageRealisasi, getPercentageTarget } from "@/helpers/formatPercent";
import { schema } from "../schemas/createOrUpdate";

export default function TargetPage() {

  const {
    data,
    handleApplyMonthYear,
    appliedPeriod
  } = useMonthYearQuery({
    queryKey: ["target-studio"],
    url: apiEndpoints.target.getAll(),
  });

  console.log(data);

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
    {
      accessorKey: "gmv",
      header: "GMV",
      cell: ({ row }) => {
        const target = row.original.gmv.target;
        const realisasi = row.original.gmv.real;
        const persen = row.original.gmv.ratio;
        const remaining = Math.max(0, 100 - persen);

        const isPinned = row.isPinned || false;

        if (isPinned) {
          // Versi compact untuk pinned column
          return (
            <div className="space-y-1 text-xs">
              <div className="text-red-600 font-medium">{<TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      {formatShort(target)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {formatFull(target)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>}<span className={`text-xs flex-shrink-0 ${getPercentageTarget(remaining)}`}>
                  (- {formatPercentage(remaining)})
                </span>

              </div>
              <div className="text-green-600 font-medium">
                {<TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        {formatShort(realisasi)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {formatFull(realisasi)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>} <span className={`text-xs flex-shrink-0 ${getPercentageRealisasi(persen)}`}>
                  ({formatPercentage(persen)})
                </span>

              </div>
            </div>
          );
        }

        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <IconTargetArrow className="text-red-500 w-4 h-4 flex-shrink-0" />
              <span className="truncate">{<TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      {formatShort(target)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {formatFull(target)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>}</span>
              <span className={`text-xs flex-shrink-0 ${getPercentageTarget(remaining)}`}>
                (- {formatPercentage(remaining)})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IconSquareRoundedCheckFilled className="text-green-500 w-4 h-4 flex-shrink-0" />
              <span className="truncate">{<TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      {formatShort(realisasi)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {formatFull(realisasi)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>}</span>
              <span className={`text-xs flex-shrink-0 ${getPercentageRealisasi(persen)}`}>
                ({formatPercentage(persen)})
              </span>

            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "pendapatan",
      header: "Pendapatan",
      cell: ({ row }) => {
        const target = row.original.income.target;
        const realisasi = row.original.income.real;
        const persen = row.original.income.ratio ?? (target > 0 ? (realisasi / target) * 100 : 0);

        const remaining = Math.max(0, 100 - persen);

        const isPinned = row.isPinned || false;

        if (isPinned) {
          return (
            <div className="space-y-1 text-xs">
              <div className="text-red-600 font-medium">{<TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      {formatShort(target)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {formatFull(target)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>}<span className={`text-xs flex-shrink-0 ${getPercentageTarget(remaining)}`}>
                  (- {formatPercentage(remaining)})
                </span>

              </div>
              <div className="text-green-600 font-medium">
                {<TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        {formatShort(realisasi)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {formatFull(realisasi)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>} <span className={`text-xs flex-shrink-0 ${getPercentageRealisasi(realisasi)}`}>
                  ({formatPercentage(realisasi)})
                </span>

              </div>
            </div>
          );
        }

        // Versi lengkap untuk unpinned column
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <IconTargetArrow className="text-red-500 w-4 h-4 flex-shrink-0" />
              <span className="truncate">{<TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      {formatShort(target)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {formatFull(target)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>}</span>
              <span className={`text-xs flex-shrink-0 ${getPercentageTarget(remaining)}`}>
                (- {formatPercentage(remaining)})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconSquareRoundedCheckFilled className="text-green-500 w-4 h-4 flex-shrink-0" />
              <span className="truncate">{<TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      {formatShort(realisasi)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {formatFull(realisasi)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>}</span>
              <span className={`text-xs flex-shrink-0 ${getPercentageRealisasi(persen)}`}>
                ({formatPercentage(persen)})
              </span>

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
          <div className="flex items-center justify-end">
            <MonthYearSelect onChange={handleApplyMonthYear} value={appliedPeriod} />
          </div>
        </div>

        <PerformTable columns={performColumns} data={data}
          customButton={<DialogTambahData
            title="Tambah Target"
            fields={fieldsTambahTarget}
            endpoint={apiEndpoints.target.create}
            queryInvalidateKey={["targets"]}
            selectOptions={{ studio_id: studioOptions }}
            schema={schema}
          />
          } />
      </div>
    </MainLayout>
  );
}
