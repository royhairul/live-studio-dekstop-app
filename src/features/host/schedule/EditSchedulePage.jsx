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
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { baseUrl } from "@/config/api";
import { DatePicker } from "@/components/Datepicker";

export default function HostScheduleEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hostGroups, setHostGroups] = useState([]);
  const [studioOptions, setStudioOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  const formSchema = z.object({
    host_id: z.string().min(1, "Host is required."),
    shift_id: z.string().min(1, "Shift is required."),
    date: z.string().min(1, "Date is required."),
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
      label: "Edit",
    },
  ];

  const formatTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDate = (dateObj) => {
    return dateObj.toISOString().split("T")[0];
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Host
        const hostRes = await fetch(`${baseUrl}/host/group-by-studio`);
        const hostJson = await hostRes.json();
        const hostData = hostJson.data;

        const hostFormatted = Object.entries(hostData).map(
          ([studioName, hosts]) => ({
            id: studioName,
            title: studioName,
            children: hosts.map((h) => ({
              id: h.ID,
              title: h.Name,
            })),
          })
        );

        setHostGroups(hostData);
        setStudioOptions(hostFormatted);

        // Fetch Shift
        const shiftRes = await fetch(`${baseUrl}/shift/all`);
        const shiftJson = await shiftRes.json();
        setShiftOptions(shiftJson.data || []);

        // Fetch Schedule
        const scheduleRes = await fetch(`${baseUrl}/host-schedule/${id}`);
        const scheduleJson = await scheduleRes.json();
        const schedule = scheduleJson.data;

        if (schedule) {
          const parsedDate = new Date(schedule.date);
          form.reset({
            host_id: String(schedule.host_id),
            shift_id: String(schedule.shift_id),
            date: formatDate(parsedDate),
          });
          setSelectedDate({ from: parsedDate, to: parsedDate });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
  }, []);

  const handleUpdateSchedule = async (values) => {
    try {
      const response = await fetch(`${baseUrl}/host-schedule/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host_id: Number(values.host_id),
          shift_id: Number(values.shift_id),
          date: formatDate(selectedDate.from),
        }),
      });

      if (response.ok) {
        navigate("/host/schedule");
      } else {
        const errorData = await response.json();
        console.error("Error updating schedule:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold">Edit Jadwal Host</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateSchedule)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="host_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Host..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studioOptions.map((group) => (
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
              name="shift_id"
              render={({ field }) => (
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
                        {shiftOptions.map((item) => (
                          <SelectItem key={item.ID} value={String(item.ID)}>
                            {item.name} ({formatTime(item.start_time)} -{" "}
                            {formatTime(item.end_time)})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={() => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <DatePicker value={selectedDate} onChange={setSelectedDate} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-white bg-primary">
              Update
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
