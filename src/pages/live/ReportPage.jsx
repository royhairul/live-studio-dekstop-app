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

export default function LiveReportPage() {
  const breadcrumbs = [
    {
      icon: IconIdBadge,
      label: "Live",
    },
    {
      label: "Laporan",
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <IconBarrierBlock size={128} className="text-gray-300" />
        <p className="text-gray-300 font-semibold text-2xl">Coming soon</p>
        <p className="text-gray-300 font-medium">This page is on working...</p>
      </div>
    </MainLayout>
  );
}
