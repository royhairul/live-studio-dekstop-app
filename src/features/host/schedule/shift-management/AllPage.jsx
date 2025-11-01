import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IconUsersGroup, IconClockPlus, IconSettings } from "@tabler/icons-react";
import { useShifts } from "@/hooks/shift/useShifts";
import { shiftColumns } from "@/components/tables/shifts-column";
import { DataTablePinning } from "@/components/data-table-pinning";

export default function ShiftAllPage() {
  const { data: shifts } = useShifts();
  const breadcrumbs = [
    {
      icon: IconSettings,
      label: "Setting",
      url: "/setting/shift",
    },
    {
      label: "Shift",
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Action Button */}
      <div className="flex gap-2">
        <Button variant="default" className="w-max" asChild>
          <Link to="/setting/shift/create">
            <IconClockPlus />
            Tambah Shift
          </Link>
        </Button>
      </div>

      <DataTablePinning
        columns={shiftColumns}
        data={shifts || []}
      />
    </MainLayout>
  );
}
