import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IconUsersGroup, IconClockPlus } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useShifts } from "@/hooks/shift/useShifts";
import { shiftColumns } from "@/components/tables/shifts-column";

export default function ShiftAllPage() {
  const { shifts } = useShifts();
  const breadcrumbs = [
    {
      icon: IconUsersGroup,
      label: "Host",
      url: "/host/all",
    },
    {
      label: "Jadwal Host",
      url: "/host/schedule",
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
          <Link to="/host/schedule/shift-management/create">
            <IconClockPlus />
            Tambah Shift
          </Link>
        </Button>
      </div>

      {/* Table */}
      <DataTable columns={shiftColumns} data={shifts} />
    </MainLayout>
  );
}
