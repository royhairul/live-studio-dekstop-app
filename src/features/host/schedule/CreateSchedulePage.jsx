import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSettings, IconUsersGroup } from "@tabler/icons-react";
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
import { useState, useEffect, use } from "react";
import { apiEndpoints, baseUrl } from "@/config/api";
import { DatePicker } from "@/components/Datepicker";
import { toast } from "sonner";
import { postRequest } from "@/lib/useApi";
import { formatTime } from "@/helpers/formatTime";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useStudios } from "@/hooks/studio/useStudios";

export default function HostScheduleCreatePage() {
  const navigate = useNavigate();
  const [host, setHost] = useState([]);
  const [studio, setStudio] = useState([]);
  const [shift, setShift] = useState([]);
  const { studio: studioMain } = useStudios();

  const formSchema = z.object({
    host_id: z.string(),
    shift_id: z.coerce.number().min(1, { message: "Shift is required." }),
    studio_id: z.coerce.number().min(1, { message: "Studio is required." }),
    date: z.string(),
  });

  const today = new Date();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host_id: "",
      shift_id: "",
      studio_id: "",
      date: today.toISOString(),
    },
  });

  const breadcrumbs = [
    {
      icon: IconSettings,
      label: "Setting",
      url: "/setting/schedule",
    },
    {
      label: "Jadwal",
      url: "/setting/schedule",
    },
    {
      label: "Tambah Jadwal",
    },
  ];

  useEffect(() => {
    async function fetchDataHost() {
      try {
        const res = await fetch(`${baseUrl}/host/group-by-studio`);
        const json = await res.json();
        const data = json.data;
        const resources = data.map(({ studio_id, studio_name, hosts }) => ({
          id: studio_id, // pakai nama studio sebagai ID (bisa disesuaikan)
          title: studio_name,
          children: hosts.map((host) => ({
            id: host.id,
            title: host.name,
          })),
        }));
        setHost(data);
        setStudio(resources);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    }

    async function fetchDataShift() {
      try {
        const res = await fetch(`${baseUrl}/shift`);
        const json = await res.json();
        const data = json.data || [];
        setShift(data);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    }

    fetchDataHost();
    fetchDataShift();
  }, []);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // bulan mulai 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const createScheduleMutation = useMutation({
    mutationFn: async (values) =>
      await axios.post(apiEndpoints.schedule.create(), values),
    onSuccess: (res) => {
      const response = res.data;
      if (res.status === 201) {
        console.log("Response data:", response);
        toast.success("Buat Jadwal Baru", {
          description: response["message"],
          descriptionClassName: "capitalize",
        });
        navigate("/setting/schedule");
      } else {
        toast.error(response["error"]);
        console.error("Error creating host:", response.errors);
      }
    },
    onError: (error) => {
      console.warn("Network error:", error);
      console.warn("Network error:", error.response.data.details);
      toast.error("Gagal membuat jadwal", {
        description:
          error.response?.data?.details ||
          "Terjadi kesalahan saat membuat jadwal.",
      });
    },
  });

  const handleCreateSchedule = async (values) => {
    console.log("Form values:", values);
    createScheduleMutation.mutate(values);
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold">Tambah Jadwal Host Baru</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateSchedule)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="host_id"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Host</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Host..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {studio.map((group) => (
                          <SelectGroup key={group.id} heading={group.title}>
                            <SelectLabel>{group.title}</SelectLabel>
                            {group.children.map((hostItem) => (
                              <SelectItem
                                key={hostItem.id}
                                value={String(hostItem.id)}
                              >
                                {hostItem.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="shift_id"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Shift</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Shift..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {shift.map((item) => (
                            <SelectItem
                              key={String(item.id)}
                              value={String(item.id)}
                            >
                              {item.name} ({formatTime(item.start_time)} {"-"}
                              {formatTime(item.end_time)})
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
                          {studioMain.map((item) => (
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
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <DatePicker
                      value={{
                        from: field.value ? new Date(field.value) : new Date(),
                        to: field.value ? new Date(field.value) : new Date(),
                      }}
                      onChange={(date) =>
                        field.onChange(date.from.toISOString())
                      }
                    />
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
