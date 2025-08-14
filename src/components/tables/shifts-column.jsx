import { Button } from "@/components/ui/button";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";
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
import { deleteRequest } from "@/lib/useApi";
import { apiEndpoints } from "@/config/api";
import { toast } from "sonner";
import { useShiftById } from "@/hooks/shift/useShiftById";

export const shiftColumns = [
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
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Shift",
    accessorKey: "name",
  },
  {
    header: "Jam Mulai",
    accessorKey: "start_time",
    cell: ({ cell }) => {
      const value = cell.getValue();
      return new Date(value).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    header: "Jam Selesai",
    accessorKey: "end_time",
    cell: ({ cell }) => {
      const value = cell.getValue();
      return new Date(value).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { refetch } = useShiftById();

      const handleDelete = async () => {
        try {
          const { status, result } = await deleteRequest(
            apiEndpoints.studio.delete(row.original.id)
          );

          if (!status) toast.error("Gagal menghapus studio");

          toast.success(result["message"]);

          await refetch();
        } catch (error) {
          console.error("Delete error:", error);
        }
      };

      return (
        <div className="flex gap-2">
          <Button size="icon" asChild>
            <Link
              to={`/setting/shift/edit/${row.original.id}`}
            >
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
                  Shift <strong>{row.original.name || "(Tanpa Nama)"}</strong>{" "}
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
