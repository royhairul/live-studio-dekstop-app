import MainLayout from "@/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { IconSettings } from "@tabler/icons-react";
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
import { toast } from "sonner";

export default function HostScheduleSwitchPage() {
  const navigate = useNavigate();
  const [host, setHost] = useState([]);
  const [selectedHostId, setSelectedHostId] = useState("");
  const [hostSchedules, setHostSchedules] = useState([]);
  const [studio, setStudio] = useState([]);
  const [shift, setShift] = useState([]);
  const [targetSelectedHostId, setTargetSelectedHostId] = useState("");
  const [targetHostSchedules, setTargetHostSchedules] = useState([]);

  const formSchema = z.object({
    from_host_id: z.coerce
      .number()
      .min(1, { message: "Host asal wajib dipilih." }),
    from_schedule_id: z.coerce
      .number()
      .min(1, { message: "Jadwal asal wajib dipilih." }),
    to_host_id: z.coerce
      .number()
      .min(1, { message: "Host tujuan wajib dipilih." }),
    to_schedule_id: z.coerce
      .number()
      .min(1, { message: "Jadwal tujuan wajib dipilih." }),
    date: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from_host_id: "",
      from_schedule_id: "",
      to_host_id: "",
      to_schedule_id: "",
      date: "",
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
      label: "Tukar Jadwal",
    },
  ];

  function formatTime(dateTimeStr) {
    if (!dateTimeStr) return "";

    try {
      const date = new Date(dateTimeStr);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch (e) {
      new Error("Invalid date format:", e);
      return "";
    }
  }

  useEffect(() => {
    async function fetchDataHost() {
      try {
        const res = await fetch(`${baseUrl}/host/group-by-studio`);
        const json = await res.json();
        const data = json.data;
        const resources = Object.entries(data).map(([studioName, hosts]) => ({
          id: studioName, // pakai nama studio sebagai ID (bisa disesuaikan)
          title: studioName,
          children: hosts.map((host) => ({
            id: host.ID,
            title: host.Name,
          })),
        }));
        setHost(data);
        setStudio(resources);
      } catch (error) {
        new Error("Fetch error:", error);
      }
    }

    async function fetchDataShift() {
      try {
        const res = await fetch(`${baseUrl}/shift/all`);
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

  // Fetch jadwal sesuai host
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (!selectedHostId) return;
        const res = await fetch(`${baseUrl}/host/${selectedHostId}/schedule`);
        const json = await res.json();
        const data = json.data || [];

        const formattedSchedules = data.map((schedule) => ({
          id: schedule.ID,
          date: schedule.date.split("T")[0],
          startTime: formatTime(schedule.start_time),
          endTime: formatTime(schedule.end_time),
        }));

        setHostSchedules(formattedSchedules);
      } catch (error) {
        console.error("Error fetching host schedules:", error);
      }
    };

    fetchSchedules(); // panggil fungsi async-nya
  }, [selectedHostId]);

  useEffect(() => {
    const fetchTargetSchedules = async () => {
      if (!targetSelectedHostId) return;
      try {
        const res = await fetch(
          `${baseUrl}/host/${targetSelectedHostId}/schedule`
        );
        const data = await res.json();
        const formattedSchedules = data.data.map((schedule) => ({
          id: schedule.ID,
          date: schedule.date.split("T")[0],
          startTime: formatTime(schedule.start_time),
          endTime: formatTime(schedule.end_time),
        }));
        setTargetHostSchedules(formattedSchedules ?? []);
      } catch (error) {
        console.error("Gagal mengambil jadwal host tujuan:", error);
      }
    };

    fetchTargetSchedules();
  }, [targetSelectedHostId]);


  const handleSwitchSchedule = async (values) => {
    try {
      const response = await fetch(`${baseUrl}/host-schedule/switch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (response.ok) {
        toast.success("Switch host schedule successfully!");
        setTimeout(() => {
          navigate("/host/schedule");
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Error creating host:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold">Tambah Jadwal Host Baru</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSwitchSchedule)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="from_host_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host Asal</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedHostId(value); // Untuk fetch jadwal asal
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Host Asal..." />
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
              )}
            />

            <FormField
              control={form.control}
              name="from_schedule_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jadwal Asal</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString() ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Jadwal..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hostSchedules.length > 0 ? (
                        hostSchedules.map((schedule) => (
                          <SelectItem
                            key={schedule.id}
                            value={schedule.id.toString()}
                          >
                            {schedule.date} ({schedule.startTime} -{" "}
                            {schedule.endTime})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          Tidak ada jadwal
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-muted-foreground" />
              <p className="text-center font-semibold text-sm text-muted-foreground">
                Switch to
              </p>
              <div className="flex-1 h-px bg-muted-foreground" />
            </div>

            <FormField
              control={form.control}
              name="to_host_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host Tujuan</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setTargetSelectedHostId(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Host Tujuan..." />
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
              )}
            />

            <FormField
              control={form.control}
              name="to_schedule_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jadwal Tujuan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString() ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Jadwal Tujuan..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {targetHostSchedules.length > 0 ? (
                        targetHostSchedules.map((schedule) => (
                          <SelectItem
                            key={schedule.id}
                            value={schedule.id.toString()}
                          >
                            {schedule.date} ({schedule.startTime} -{" "}
                            {schedule.endTime})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          Tidak ada jadwal
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full text-white bg-primary">Submit</Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
