import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSettings, IconUsersGroup } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useF } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { usePermissionGrouped } from "@/hooks/permission/usePermissionsGrouped";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiSecure } from "@/lib/useApi";
import { apiEndpoints } from "@/config/api";

export default function MRoleCreatePage() {
  const navigate = useNavigate();
  const { permissions: dataPermissions = [], loading } = usePermissionGrouped();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Role name is required." }),
    permissions: z
      .array(z.number())
      .min(1, { message: "Minimum 1 permission selected" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

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
    {
      label: "Create",
    },
  ];




  const handleCreate = async (values) => {
    console.log(values);
    try {
      // await createRole(values);
      const { status, result, errors } = await apiSecure.post(
        apiEndpoints.role.create(),
        values
      );

      if (status) {
        toast.success("Create Role Successfully");
        setTimeout(() => navigate("/setting/role"), 3000);
      } else {
        toast.error("Failed to create role.");
        form.setError(errors);
      }
    } catch (error) {
      console.error("Create Studio error:", error);
      toast.error(error);
    }
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold tracking-tight text-primary">
          Tambah Role Baru
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreate)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        label="Nama Role"
                        placeholder="Masukkan Nama Role..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="permissions"
              render={() => (
                <div className="flex flex-col gap-4">
                  <Label>Pilih Izin Akdes</Label>
                  <FormMessage />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                    {dataPermissions.map((groupData) => {
                      const { group, permissions } = groupData;

                      const groupPermissionsId = permissions.map((item) => item.id);

                      const selectedPermissions = form.watch("permissions") || [];
                      const isGroupChecked = groupPermissionsId.every((id) =>
                        selectedPermissions.includes(id)
                      );

                      return (
                        <div
                          key={group}
                          className="border border-gray-200 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        >
                          {/* Header Section */}
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <span className="text-primary font-semibold text-sm">
                                    {group.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{group}</h4>
                                  <p className="text-xs text-gray-500">
                                    {permissions.length} izin akses{permissions.length !== 1 ? 's' : ''}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 font-medium">
                                  Pilih Semua
                                </span>
                                <Checkbox
                                  checked={isGroupChecked}
                                  onCheckedChange={(checked) => {
                                    const current = form.getValues("permissions") || [];

                                    if (checked) {
                                      const newValue = [
                                        ...current,
                                        ...groupPermissionsId.filter(
                                          (id) => !current.includes(id)
                                        ),
                                      ];
                                      form.setValue("permissions", newValue);
                                    } else {
                                      const newValue = current.filter(
                                        (id) => !groupPermissionsId.includes(id)
                                      );
                                      form.setValue("permissions", newValue);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Permissions List */}
                          <div className="p-4">
                            <div className="space-y-2">
                              {permissions.map((item, index) => (
                                <FormItem
                                  key={item.id}
                                  className={`flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-150 ${selectedPermissions.includes(item.id)
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'bg-white'
                                    }`}
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                      <span className="text-xs text-gray-600 font-medium">
                                        {index + 1}
                                      </span>
                                    </div>
                                    <span className={`text-sm ${selectedPermissions.includes(item.id)
                                      ? 'text-gray-900 font-medium'
                                      : 'text-gray-700'
                                      }`}>
                                      {item.description}
                                    </span>
                                  </div>

                                  <FormControl>
                                    <Checkbox
                                      checked={selectedPermissions.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        const current = form.getValues("permissions") || [];
                                        if (checked) {
                                          form.setValue("permissions", [
                                            ...current,
                                            item.id,
                                          ]);
                                        } else {
                                          form.setValue(
                                            "permissions",
                                            current.filter((id) => id !== item.id)
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              ))}
                            </div>
                          </div>

                          {/* Footer dengan counter */}
                          {selectedPermissions.some(id => groupPermissionsId.includes(id)) && (
                            <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
                              <p className="text-xs text-blue-700 font-medium">
                                {groupPermissionsId.filter(id => selectedPermissions.includes(id)).length} dari {permissions.length} dipilih
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            />

            <Button type="submit" className="w-full text-white bg-primary">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
