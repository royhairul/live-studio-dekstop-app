import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IconId } from "@tabler/icons-react";
import { apiEndpoints } from "@/config/api";
import { toast } from "sonner";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStudios } from "@/hooks/studio/useStudios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiSecure } from "@/lib/useApi";

export default function AccountCreatePage() {
  const { studio } = useStudios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const breadcrumbs = [
    {
      icon: IconId,
      label: "Akun",
      url: "/management/account",
    },
    {
      label: "Tambah Akun",
    },
  ];

  const formSchema = z.object({
    studio_id: z.coerce.number().min(1, { message: "Studio is required." }),
    cookie: z.string().min(1, { message: "Cookies are required." }),
    device: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studio_id: "",
      cookie: "",
      device: "",
    },
  });

  const createAccountMutation = useMutation({
    mutationFn: async (values) => {
      const res = await apiSecure.post(
        apiEndpoints.account.create(),
        values
      );
      console.log(res);
      
      const { status, data: result } = res;

      if (!status) {
        throw new Error(result.errors || "Gagal menambahkan akun.");
      }

      return result;
    },
    onSuccess: (result) => {
      toast.success(result?.message || "Akun berhasil ditambahkan.");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });

      setTimeout(() => {
        navigate("/management/account");
      }, 1000);
    },
    onError: (error) => {
      console.error("error:", error);
      toast.error("Gagal membuat account.", {
        description: "Invalid or expired cookies.",
      });
    },
  });

  const handleCreate = (values) => createAccountMutation.mutate(values);

return (
  <MainLayout breadcrumbs={breadcrumbs}>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreate)}
        className="max-w-xl w-full mx-auto p-6 bg-white flex flex-col gap-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 border-b pb-3">
          Tambah Akun Baru
        </h2>

        {/* Studio */}
        <FormField
          control={form.control}
          name="studio_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Studio
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-xl border-gray-300 transition">
                    <SelectValue placeholder="Pilih Studio..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {studio.map((item) => (
                      <SelectItem
                        key={String(item.id)}
                        value={String(item.id)}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Device (opsional) */}
        <FormField
          control={form.control}
          name="device"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Device <span className="text-gray-400">(opsional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Contoh: Samsung A52"
                  className="rounded-xl border-gray-300 transition"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cookies */}
        <FormField
          control={form.control}
          name="cookie"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Cookies
              </FormLabel>
              <FormControl>
                <Textarea
                  className="rounded-xl border-gray-300 transition max-w-lg w-full"
                  placeholder="Masukkan Cookies..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          className="w-full text-white bg-primary hover:bg-primary/90 rounded-xl py-2.5 text-sm font-medium shadow-md transition"
        >
          Submit
        </Button>
      </form>
    </Form>
  </MainLayout>
);
}
