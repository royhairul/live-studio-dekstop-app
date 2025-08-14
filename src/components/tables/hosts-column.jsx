import { IconPencil, IconTrash, IconListDetails } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { ConfirmDeleteDialog } from "../confirm-delete-dialog";
import { useDeleteHost } from "@/pages/host/hooks/useDeleteHost";

const columnHelper = createColumnHelper();

function HostActionsCell({ host }) {
  const deleteHostMutation = useDeleteHost();

  const handleDelete = () => deleteHostMutation.mutate(host.id);

  return (
    <div className="flex gap-2">
      <Button size="icon" asChild>
        <Link to={`/management/host/${host.id}`}>
          <IconListDetails />
        </Link>
      </Button>

      <Button size="icon" asChild>
        <Link to={`/management/host/edit/${host.id}`}>
          <IconPencil />
        </Link>
      </Button>

      <ConfirmDeleteDialog
        title="Yakin ingin menghapus host ini?"
        description={`Host ${host.name || "(Tanpa Nama)"} akan dihapus.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export const hostColumn = [
  columnHelper.display({
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
  }),
  columnHelper.accessor("name", {
    header: "Nama Host",
  }),
  columnHelper.accessor("phone", {
    header: "Telepon",
  }),
  columnHelper.accessor("studio_name", {
    header: "Studio",
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const host = row.original;
      return <HostActionsCell host={host} />;
    },
  }),
];
