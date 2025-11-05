import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconUsersGroup, IconUserPlus, IconId } from "@tabler/icons-react";
import { useState } from "react";
import { useStudios } from "@/hooks/studio/useStudios";
import { useHosts } from "./hooks/useHosts";
import { hostColumn } from "@/components/tables/hosts-column";
import { DataTablePinning } from "@/components/data-table-pinning";

export default function HostAllPage() {
  const { studio } = useStudios();
  const [selectedStudioId, setSelectedStudioId] = useState("all");
  const { data: hosts } = useHosts();

  const filteredHosts =
    selectedStudioId !== "all"
      ? hosts.filter((host) => String(host.studio_id) === selectedStudioId)
      : hosts;

  const breadcrumbs = [
    { icon: IconId, label: "Master", url: "/management/host" },
    { label: "Daftar Host" },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <Button asChild>
          <Link to="/management/host/create">
            <IconUserPlus />
            Tambah Host
          </Link>
        </Button>
        <div className="flex-1" />

        <div className="self-end">
          <Select
            value={selectedStudioId}
            onValueChange={(value) => setSelectedStudioId(value)}
          >
            <SelectTrigger className="w-34 sm:w-[180px]">
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
      </div>

      <DataTablePinning
        columns={hostColumn}
        data={filteredHosts || []}
      />
    </MainLayout>
  );
}
