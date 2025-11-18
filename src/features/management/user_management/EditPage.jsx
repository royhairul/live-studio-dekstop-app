import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSettings } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiEndpoints } from "@/config/api";
import { toast } from "sonner";
import { useStudios } from "@/hooks/studio/useStudios";
import { useUserById } from "@/hooks/user/useUserById";
import { useRoles } from "@/hooks/role/useRoles";
import { apiSecure } from "@/lib/useApi";

const formSchema = z.object({
  role: z.coerce.number().min(1, { message: "Role wajib dipilih." }),
  email: z.string().email({ message: "Email tidak valid." }),
  name: z.string().min(4, { message: "Nama minimal 4 karakter." }),
  username: z.string().min(4, { message: "Username minimal 4 karakter." }),
  password: z.string().optional(),
  studio_id: z.coerce.number().optional(),
  phone: z.string().optional(),
});

export default function MUserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { studio } = useStudios();
  const { roles } = useRoles();
  const { user, error } = useUserById(id);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      email: "",
      username: "",
      password: "",
      name: "",
      phone: "",
      studio_id: "",
    },
  });

  const watchRole = form.watch("role");
  const selectedRole = roles.find((r) => r.id === Number(watchRole));
  const isHost = selectedRole?.name.toLowerCase() === "host";

  useEffect(() => {
    if (user) {
      const defaultValues = {
        role: user.user.Role.ID || "",
        email: user.user.Email || "",
        username: user.user.Username || "",
        password: "",
        name: user.user.Name || "",
        phone: "",
        studio_id: "",
      };

      if (user.host) {
        defaultValues.phone = user.host.Phone || "";
        defaultValues.studio_id = user.host.StudioID
          ? String(user.host.StudioID)
          : "";
      }

      form.reset(defaultValues);
    }
  }, [user]);

  const watchName = form.watch("name");
  useEffect(() => {
    if (watchName) {
      const normalized = watchName.toLowerCase().replace(/\s+/g, "");
      form.setValue("username", normalized);
      form.setValue("password", normalized);
    }
  }, [watchName, form]);

  const handleSubmit = async (values) => {
    if (isHost) {
      if (!values.studio_id || Number(values.studio_id) === 0) {
        form.setError("studio_id", {
          message: "Studio wajib dipilih untuk role host.",
        });
        return;
      }
      if (values.phone === "") {
        form.setError("phone", {
          message: "Nomor telepon wajib diisi untuk role host.",
        });
        return;
      }
    }

    try {
      const { status, result } = await apiSecure.put(
        apiEndpoints.superadmin.edit(id),
        values,
        { auth: true }
      );

      if (status) {
        toast.success(result.message || "User berhasil diperbarui.");
        navigate("/setting/user-management");
      } else {
        toast.error(result.message || "Gagal memperbarui user.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      console.error(err);
    }
  };

  const breadcrumbs = [
    { icon: IconSettings, label: "Setting", url: "/account/all" },
    { label: "User Management", url: "/setting/user-management" },
    { label: "Edit User" },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="sm:w-1/2 p-4 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="font-semibold text-primary">Edit User</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(String(val))}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Role..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan Email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nama */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan Nama..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan Username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan Password (opsional)"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Khusus Host */}
            {isHost && (
              <>
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Nomor Telepon..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Studio */}
                <FormField
                  control={form.control}
                  name="studio_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Studio</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Studio..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {studio.map((item) => (
                              <SelectItem key={item.ID} value={String(item.ID)}>
                                {item.Name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" className="w-full text-white bg-primary">
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
