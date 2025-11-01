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
  IconBrandShopee,
  IconBrandTiktok,
  IconDatabasePlus,
  IconId,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiEndpoints } from "@/config/api";
import { useAccounts } from "@/hooks/account/useAccounts";
import { useStudios } from "@/hooks/studio/useStudios";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { DataTablePinning } from "@/components/data-table-pinning";

export default function AccountAllPage() {
  const { studio } = useStudios();
  const { data: accounts = [] } = useAccounts();
  const queryClient = useQueryClient();

  const [selectedStudioId, setSelectedStudioId] = useState("all");

  // Filtering data sesuai studio yang dipilih
  const filteredAccounts =
    selectedStudioId && selectedStudioId !== "all"
      ? accounts.filter(
        (account) => String(account.studio_name) === selectedStudioId
      )
      : accounts;

  const breadcrumbs = [
    {
      icon: IconId,
      label: "Master",
      url: "/management/account",
    },
    {
      label: "Daftar Akun",
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
      header: "ID Akun",
      accessorKey: "id",
    },
    {
      header: "Nama Akun",
      accessorKey: "name",
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className={"font-semibold"}
          >
            Email
            <IconArrowDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      header: "Platform",
      accessorKey: "platform",
      cell: ({ row }) => {
        const platform = row.getValue("platform");
        return (
          <div
            className={`flex items-center gap-2 px-2 p-1 w-max rounded font-medium text-xs ${platform === "Shopee"
                ? "bg-amber-600/20 text-amber-600"
                : "bg-black/20 text-black"
              }`}
          >
            {platform === "Shopee" ? (
              <IconBrandShopee size={20} />
            ) : (
              <IconBrandTiktok size={20} />
            )}
            {platform}
          </div>
        );
      },
    },
    {
      header: "Studio",
      accessorKey: "studio_name",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const deleteAccountMutation = useMutation({
          mutationKey: ["accounts"],
          mutationFn: async (id) =>
            axios.delete(apiEndpoints.account.delete(id)),
          onSuccess: () => {
            toast.success("Berhasil menghapus account");
            queryClient.invalidateQueries(["accounts"]);
          },
          onError: () => toast.error("Gagal menghapus account"),
        });

        const handleDelete = () =>
          deleteAccountMutation.mutate(row.original.id);

        return (
          <div className="flex gap-2">
            {/* <Button size="icon" asChild>
              <Link to={`/host/${row.original.ID}/edit`}>
                <IconPencil />
              </Link>
            </Button> */}
            {/* AlertDialog for Delete Confirmation */}
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
                    Akun <strong>{row.original.name || "(Tanpa Nama)"}</strong>{" "}
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
      {/* Action Button */}
      <div className="flex gap-2">
        <Button variant="default" className="w-max" asChild>
          <Link to="/management/account/create">
            <IconDatabasePlus />
            Tambah Akun
          </Link>
        </Button>

        <div className="flex-1"></div>

        <div className="self-end">
          <Select value={selectedStudioId} onValueChange={setSelectedStudioId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Semua Studio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                Semua
              </SelectItem>
              {studio.map((item) => (
                <SelectItem key={String(item.ID)} value={item.Name}>
                  {item.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTablePinning
        columns={columns}
        data={filteredAccounts || []}
      />
    </MainLayout>
  );
}
