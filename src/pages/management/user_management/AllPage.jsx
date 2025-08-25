import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  IconPencil,
  IconTrash,
  IconUserPlus,
  IconSettings,
  IconFlag,
  IconId,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { apiEndpoints, baseUrl } from "@/config/api";
import { jwtDecode } from "jwt-decode";
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
import { toast } from "sonner";
import { useUsers } from "@/hooks/user/useUsers";
import { deleteRequest } from "@/lib/useApi";

export default function MUserAllPage() {
  const { users, refetch } = useUsers();

  console.log(users);

  const breadcrumbs = [
    {
      icon: IconId,
      label: "Master",
      url: "/management/user",
    },
    {
      label: "Daftar Pengguna",
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
      header: "ID",
      accessorKey: "ID", // Sesuaikan dengan format data
    },
    {
      header: "Username",
      accessorKey: "Username",
    },
    {
      header: "Email",
      accessorKey: "Email",
    },
    {
      header: "Role",
      accessorKey: "Role.name",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const handleDelete = async () => {
          try {
            const { status, result } = await deleteRequest(
              apiEndpoints.superadmin.delete(row.original.ID),
              { auth: true }
            );

            console.log(result);

            if (status) {
              toast.success(result["message"]);

              await refetch();
            } else {
              toast.error(
                `Gagal menghapus user ${
                  row.original.Username || "(Tanpa Nama)"
                }`
              );
            }
          } catch (error) {
            console.error("Delete error:", error);
          }
        };
        return (
          <div className="flex gap-2">
            <Button size="icon" asChild>
              <Link to={`/setting/user-management/${row.original.ID}/edit`}>
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
                    Yakin ingin menghapus user ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    User{" "}
                    <strong>{row.original.Username || "(Tanpa Nama)"}</strong>{" "}
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
      <div className="flex gap-2">
        <Button variant="default" className="w-max" asChild>
          <Link to="/management/user/create">
            <IconUserPlus />
            Tambah User
          </Link>
        </Button>
        <Button variant="default" className="w-max" asChild>
          <Link to="/setting/role">
            <IconFlag />
            Management Role
          </Link>
        </Button>
        <Button className="w-max">Export</Button>
      </div>

      <DataTable columns={columns} data={users} />
    </MainLayout>
  );
}
