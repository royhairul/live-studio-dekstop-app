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
import {
  IconUsersGroup,
  IconUserPlus,
  IconPencil,
  IconTrash,
  IconListDetails,
} from "@tabler/icons-react";
import { useState } from "react";
import { baseUrl } from "@/config/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStudios } from "@/hooks/studio/useStudios";
import { useHosts } from "@/hooks/host/useHosts";

export default function HostAllPage() {
  const { studio } = useStudios();
  const [selectedStudioId, setSelectedStudioId] = useState("all");
  const { hosts, refetch } = useHosts(); // gunakan refetch setelah delete

  const filteredHosts =
    selectedStudioId !== "all"
      ? hosts.filter((host) => String(host.studio_id) === selectedStudioId)
      : hosts;

  const breadcrumbs = [
    { icon: IconUsersGroup, label: "Host", url: "/host/all" },
    { label: "Daftar Host" },
  ];

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Nama Host",
      accessorKey: "Name",
    },
    {
      header: "Nomor Telepon",
      accessorKey: "Phone",
    },
    {
      header: "Studio",
      accessorKey: "Studio.Name",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const handleDelete = async () => {
          try {
            const res = await fetch(
              `${baseUrl}/host/${row.original.ID}/delete`,
              {
                method: "DELETE",
              }
            );
            if (!res.ok) throw new Error("Gagal menghapus host");
            refetch(); // lakukan refetch agar data terbaru
          } catch (error) {
            console.error("Delete error:", error);
          }
        };

        return (
          <div className="flex gap-2">
            <Button size="icon" asChild>
              <Link to={`/host/${row.original.ID}/detail`}>
                <IconListDetails />
              </Link>
            </Button>

            <Button size="icon" asChild>
              <Link to={`/host/${row.original.ID}/edit`}>
                <IconPencil />
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon">
                  <IconTrash />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Yakin ingin menghapus host ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Host <strong>{row.original.Name || "(Tanpa Nama)"}</strong>{" "}
                    akan dihapus.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-rose-500 hover:bg-rose-700"
                    onClick={handleDelete}
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <Button asChild>
          <Link to="/host/create">
            <IconUserPlus />
            Tambah Host
          </Link>
        </Button>
        <Button>Export</Button>

        <div className="flex-1" />

        <div className="self-end">
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
                <SelectItem key={s.ID} value={String(s.ID)}>
                  {s.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable columns={columns} data={filteredHosts} />
    </MainLayout>
  );
}
