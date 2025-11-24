import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconId, IconSettings, IconUsersGroup } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStudios } from "@/hooks/studio/useStudios";
import { useEditHost } from "./hooks/useEditHost";
import { useHostById } from "./hooks/useHostById";

export default function HostEditPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { studio } = useStudios();

  const { id } = useParams();
  const { data: host, isSuccess } = useHostById(id);
  const editHostMutation = useEditHost(id);

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

  useEffect(() => {
    if (host && studio.length > 0) {
      form.reset({
        name: host.name,
        phone: host.phone,
        studio_id: String(host.studio_id),
      });
    }
  }, [host, studio, form]);

  const breadcrumbs = [
    {
      icon: IconId,
      label: "Master",
      url: "/management/host",
    },
    {
      label: "Daftar Host",
      url: "/management/host",
    },
    {
      label: `Edit ${host?.name}`,
    },
  ];

  const handleEditHost = (values) => {
    editHostMutation.mutate(values);
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="sm:w-1/2 p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold tracking-tight text-primary">Edit Host</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditHost)}
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
                    <Select
                      onValueChange={(val) => field.onChange(val)}
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
                );
              }}
            />
            <Button className="w-full text-white bg-primary">
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
