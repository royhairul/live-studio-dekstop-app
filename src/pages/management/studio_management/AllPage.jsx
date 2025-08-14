import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
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
  IconArrowDown,
  IconDots,
  IconBrandShopee,
  IconBrandTiktok,
  IconDatabasePlus,
  IconId,
  IconSettings,
  IconCategoryPlus,
  IconEdit,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
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
import { deleteRequest } from "@/lib/useApi";
import { toast } from "sonner";
import { apiEndpoints } from "@/config/api";

export default function MStudioAllPage() {
  const { studio, refecth } = useStudios();

  const breadcrumbs = [
    {
      icon: IconId,
      label: "Master",
      url: "/management/studio",
    },
    {
      label: "Daftar Studio",
    },
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
      header: "ID Studio",
      accessorKey: "id",
    },
    {
      header: "Nama Studio",
      accessorKey: "name",
    },
    {
      header: "Alamat",
      accessorKey: "address",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const handleDelete = async () => {
          try {
            const { status, result } = await deleteRequest(
              apiEndpoints.studio.delete(row.original.id)
            );

            if (!status) toast.error("Gagal menghapus studio");

            toast.success(result["message"]);

            await refecth();
          } catch (error) {
            console.error("Delete error:", error);
          }
        };
        return (
          <div className="flex gap-2">
            <Button size="icon" asChild>
              <Link to={`/management/studio/edit/${row.original.id}`}>
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
                    Yakin ingin menghapus studio ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Studio{" "}
                    <strong>{row.original.name || "(Tanpa Nama)"}</strong> akan
                    dihapus.
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
      {/* Action Button */}
      <div className="flex gap-2">
        <Button variant="default" className="w-max" asChild>
          <Link to="/management/studio/create">
            <IconCategoryPlus />
            Tambah Studio
          </Link>
        </Button>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={studio} />
    </MainLayout>
  );
}
