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
import { date, z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { apiEndpoints, baseUrl } from "@/config/api";
import { DatePicker } from "@/components/datepicker";
import { toast } from "sonner";
import { postRequest } from "@/lib/useApi";
import { formatTime } from "@/helpers/formatTime";

export default function HostScheduleCreatePage() {
  const navigate = useNavigate();
  const [host, setHost] = useState([]);
  const [studio, setStudio] = useState([]);
  const [shift, setShift] = useState([]);
  const [date, setDate] = useState({ from: new Date(), to: new Date() });

  const formSchema = z.object({
    host_id: z.coerce.number().min(1, { message: "Host is required." }),
    shift_id: z.coerce.number().min(1, { message: "Shift is required." }),
    date: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host_id: "",
      shift_id: "",
      date: "",
    },
  });

  const breadcrumbs = [
    {
      icon: IconUsersGroup,
      label: "Host",
      url: "/host/all",
    },
    {
      label: "Jadwal Host",
      url: "/host/schedule",
    },
    {
      label: "Create",
    },
  ];

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

  const handleCreateSchedule = async (values) => {
    const payload = { ...values, date: formatDate(date.from) };
    try {
      // const response = await fetch(`${baseUrl}/host-schedule/create`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(payload),
      // });

      const { status, result, errors } = await postRequest(
        apiEndpoints.schedule.create(),
        payload
      );

      if (status) {
        toast.success(result["message"]);
        setTimeout(() => {
          navigate("/host/schedule");
        }, 3000);
      } else {
        toast.error(result["error"]);
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
                              key={String(item.ID)}
                              value={String(item.ID)}
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
              name="date"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <DatePicker
                      value={date}
                      onChange={(date) => setDate(date)}
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
