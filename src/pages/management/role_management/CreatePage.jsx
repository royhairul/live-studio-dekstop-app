import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSettings, IconUsersGroup } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
import { createRole } from "@/services/roleService";
import { toast } from "sonner";
import { postRequest } from "@/lib/useApi";
import { apiEndpoints } from "@/config/api";

export default function MRoleCreatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { permissions: dataPermissions } = usePermissionGrouped();

  const breadcrumbs = [
    {
      icon: IconSettings,
      label: "Setting",
      url: "/setting/user-management",
    },
    {
      url: "/setting/role-management",
      label: "Role Management",
    },
    {
      label: "Create",
    },
  ];

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

  const handleCreate = async (values) => {
    console.log(values);
    try {
      // await createRole(values);
      const { status, result, errors } = await postRequest(
        apiEndpoints.role.create(),
        values
      );

      if (status) {
        toast.success("Create Role Successfully");
        setTimeout(() => navigate("/setting/role-management"), 3000);
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
      <div className="sm:w-1/2 p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
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
                  <Label>Pilih Permission</Label>
                  <FormMessage />
                  {Object.entries(dataPermissions).map(
                    ([groupName, groupPermissions]) => {
                      const groupPermissionsId = groupPermissions.map(
                        (item) => item.ID
                      );
                      const selectedPermissions = form.watch("permissions");
                      const isGroupChecked = groupPermissionsId.every((id) =>
                        selectedPermissions.includes(id)
                      );

                      return (
                        <div
                          key={groupName}
                          className="border border-gray-300 shadow-md  p-3 rounded-md"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Checkbox
                              checked={isGroupChecked}
                              onCheckedChange={(checked) => {
                                const current = form.getValues("permissions");

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
                            <h4 className="font-semibold">{groupName}</h4>
                          </div>
                          <div className="flex flex-col gap-2">
                            {groupPermissions.map((item) => (
                              <FormItem
                                key={item.ID}
                                className="flex flex-row items-center gap-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={form
                                      .watch("permissions")
                                      ?.includes(item.ID)}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        form.getValues("permissions") || [];
                                      if (checked) {
                                        form.setValue("permissions", [
                                          ...current,
                                          item.ID,
                                        ]);
                                      } else {
                                        form.setValue(
                                          "permissions",
                                          current.filter((id) => id !== item.ID)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <span className="text-sm">
                                  {item.description}
                                </span>
                              </FormItem>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
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
