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
  IconFlagPlus,
  IconDotsCircleHorizontal,
  IconDotsDiagonal,
  IconDotsVertical,
  IconSelector,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { apiEndpoints, baseUrl } from "@/config/api";
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
import { useRoles } from "@/hooks/role/useRoles";
import { DataTablePinning } from "@/components/data-table-pinning";
import { usePermissions } from "@/hooks/permission/usePermissions";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { apiSecure } from "@/lib/useApi";
import { toast } from "sonner";

export default function MRoleAllPage() {
  const { roles, refetch } = useRoles();
  const { permissions } = usePermissions();

  const breadcrumbs = [
    {
      icon: IconSettings,
      label: "Setting",
      url: "/setting/role",
    },
    {
      url: "/setting/role",
      label: "Role",
    },
  ];

  const columns = [
    {
      header: "ID",
      accessorKey: "ID",
    },
    {
      header: "Nama Role",
      accessorKey: "name",
    },
    {
      header: "Permission",
      cell: ({ row }) => {
        const permissions = row.original.permissions;
        // Group by 'group'
        const groupedPermission = permissions.reduce((acc, perm) => {
          if (!acc[perm.group]) acc[perm.group] = [];
          acc[perm.group].push(perm);
          return acc;
        }, {});

        return (
          <div className="w-52">
            {Object.entries(groupedPermission).map(([groupName, items]) => (
              <Collapsible key={groupName} className="mb-2">
                <CollapsibleTrigger className="w-full font-semibold flex justify-between bg-primary/5 text-primary p-2 rounded gap-2 mb-2">
                  <p>{groupName}</p>
                  <div className="flex items-center">
                    <p className="flex justify-center items-center w-4 h-4 text-xs text-white rounded-4xl bg-primary">
                      {items.length}
                    </p>
                    <IconSelector />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {items.map((perm) => (
                    <p key={perm.ID}> - {perm.description}</p>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const handleDelete = async () => {
          try {
            const { status, result } = await apiSecure.delete(
              apiEndpoints.role.delete(row.original.id)
            );
            if (!status) toast.error("Gagal menghapus studio");

            await refetch();
          } catch (error) {
            console.error("Delete error:", error);
            toast.error;
          }
        };
        return (
          <div className="flex gap-2">
            <Button size="icon" asChild>
              <Link to={`/setting/role/edit/${row.original.id}`}>
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
                    <span>
                      Role {row.original.name || "(Tanpa Nama)"} akan dihapus
                    </span>
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
          <Link to="/setting/role/create">
            <IconFlagPlus />
            Tambah Role
          </Link>
        </Button>
      </div>

      {/* Table */}
      <DataTablePinning columns={columns} data={roles} />
    </MainLayout>
  );
}
