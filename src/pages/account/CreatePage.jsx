import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IconId } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { apiEndpoints, baseUrl } from "@/config/api";
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
import { postRequest } from "@/lib/useApi";
import { Value } from "@radix-ui/react-select";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AccountCreatePage() {
  const { studio } = useStudios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const breadcrumbs = [
    {
      icon: IconId,
      label: "Akun",
      url: "/account/all",
    },
    {
      label: "Tambah Akun",
    },
  ];

  const formSchema = z.object({
    studio_id: z.coerce.number().min(1, { message: "Studio is required." }),
    cookie: z.string().min(1, { message: "Cookies are required." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studio_id: "",
      cookie: "",
    },
  });

  const createAccountMutation = useMutation({
    mutationFn: async (values) => {
      const { status, result } = await axios.post(
        apiEndpoints.account.create(),
        values
      );

      if (!status) {
        throw new Error(result.errors || "Gagal menambahkan akun.");
      }

      return result;
    },
    onSuccess: (result) => {
      toast.success(result?.message || "Akun berhasil ditambahkan.");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });

      setTimeout(() => {
        navigate("/account/all");
      }, 1000);
    },
    onError: (error) => {
      console.error("error:", error);
      toast.error(
        error.message || "Terjadi kesalahan saat menambahkan cookies."
      );
    },
  });

  const handleCreate = (values) => createAccountMutation.mutate(values);

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreate)}
          className="w-max p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md"
        >
          <h2 className="font-semibold">Tambah Akun Baru</h2>

          <FormField
            control={form.control}
            name="studio_id"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Studio</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Studio..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {studio.map((item) => (
                          <SelectItem
                            key={String(item.ID)}
                            value={String(item.ID)}
                          >
                            {item.Name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="cookie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cookies</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-lg"
                    placeholder="Masukkan Cookies..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full text-white bg-primary">Submit</Button>
        </form>
      </Form>
    </MainLayout>
  );
}
