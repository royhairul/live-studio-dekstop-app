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
import { apiEndpoints } from "@/config/api";
import { DatePicker } from "@/components/Datepicker";
import { toast } from "sonner";
import { formatTime } from "@/helpers/formatTime";
import { useMutation } from "@tanstack/react-query";
import { useStudios } from "@/hooks/studio/useStudios";
import { apiSecure } from "@/lib/useApi";
import { useShifts } from "@/hooks/shift/useShifts";
import { useHostsGroupedByStudio } from "@/hooks/host/useHostsGroupedByStudio";

export default function HostScheduleCreatePage() {
  const navigate = useNavigate();
  const { studio: studioMain } = useStudios();
  const { data: shiftMain } = useShifts();
  const { data: rawHosts = [] } = useHostsGroupedByStudio();

  const hostGrouped = rawHosts.map((item) => ({
    id: item.studio_id,
    title: item.studio_name,
    children: item.hosts.map((h) => ({
      id: h.id,
      title: h.name,
    })),
  }));

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


  const createScheduleMutation = useMutation({
    mutationFn: async (values) =>
      await apiSecure.post(apiEndpoints.schedule.create(), values),
    onSuccess: (res) => {
      const response = res.data;
      if (res.status === 201) {
        toast.success("Buat Jadwal Baru", {
          description: response["message"],
          descriptionClassName: "capitalize",
        });
        navigate("/setting/schedule");
      } else {
        toast.error(response["error"]);
        new Error("Error creating schedule:", response["error"]);
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
                        {hostGrouped?.map((group) => (
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
                          {shiftMain.map((item) => (
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
