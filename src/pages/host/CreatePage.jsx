import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconUsersGroup } from "@tabler/icons-react";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { baseUrl } from "@/config/api";
import { useStudios } from "@/hooks/studio/useStudios";
import { toast } from "sonner";

export default function HostCreatePage() {
  const navigate = useNavigate();
  const { studio, error } = useStudios();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Host name is required." }),
    phone: z.string().min(1, { message: "Host phone is required." }),
    studio_id: z.coerce.number().min(1, { message: "Studio is required." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      studio_id: "",
    },
  });

  const breadcrumbs = [
    {
      icon: IconUsersGroup,
      label: "Host",
      url: "/host/all",
    },
    {
      label: "Tambah Host",
    },
  ];

  const handleCreateHost = async (values) => {
    console.log(JSON.stringify(values));
    try {
      const response = await fetch(`${baseUrl}/host`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/host/all");
      } else {
        const errorData = await response.json();
        console.error("Error creating host:", errorData);
      }
    } catch (error) {
      toast.error("Terjadi Kesalahan saat membuat host baru");
    }
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold">Tambah Host Baru</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateHost)}
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
                        label="Nama Host"
                        type="text"
                        placeholder="Masukkan Nama Host..."
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
              name="phone"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="phone"
                        label="Nomor Telepon"
                        type="text"
                        placeholder="Masukkan Nomor Telepon..."
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
            <Button className="w-full text-white bg-primary">Submit</Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
