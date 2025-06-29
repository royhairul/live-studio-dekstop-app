import { useRef, useEffect, useState, Children, use } from "react";
import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  IconUsersGroup,
  IconCalendarPlus,
  IconClock2,
  IconClockPlus,
  IconClockCog,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "@/config/api";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { DatePicker } from "@/components/datepicker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { deleteSchedule } from "@/services/scheduleService";

export default function HostSchedulePage() {
  const calendarRef = useRef(null);
  const calendarInstanceRef = useRef(null);
  const [studio, setStudio] = useState([]);
  const [events, setEvents] = useState([]);
  const [host, setHost] = useState([]);
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    },
  ];

  useEffect(() => {
    fetch(`${baseUrl}/host/group-by-studio`)
      .then((res) => res.json())
      .then((response) => {
        const data = response.data;
        console.log("Fetched data:", data);
        const resources = Object.entries(data).map(([studioName, hosts]) => ({
          id: studioName, // pakai nama studio sebagai ID (bisa disesuaikan)
          title: studioName,
          children: hosts.map((host) => ({
            id: host.ID,
            title: host.Name,
          })),
        }));

        setStudio(resources);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  function formatTime(dateTimeStr) {
    if (!dateTimeStr) return "";

    try {
      const date = new Date(dateTimeStr);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch (e) {
      return "";
    }
  }

  useEffect(() => {
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

    fetchDataShift();
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/host-schedule`)
      .then((res) => res.json())
      .then((response) => {
        const data = response.data || [];
        console.log("Fetched schedule data:", data);

        const shiftColors = {
          1: "#D32F2F", // Red
          2: "#1976D2", // Blue
          3: "#388E3C", // Green
          4: "#FBC02D", // Yellow
          5: "#7B1FA2", // Purple
          6: "#F57C00", // Orange
          7: "#00796B", // Teal
          8: "#C2185B", // Pink
        };

        const events = data.map((event) => ({
          start:
            event.date.split("T")[0] +
            " " +
            formatTime(event.start_time.slice(0, 16).replace("T", " ")),
          end:
            event.date.split("T")[0] +
            " " +
            formatTime(event.end_time.slice(0, 16).replace("T", " ")),
          resourceId: event.host_id,
          title: `${event.shift.name} - ${event.host.Name}`,
          color: shiftColors[event.shift_id] || "#B29DD9", // Warna default, bisa disesuaikan
          extendedProps: {
            date: event.date.split("T")[0], // Ambil tanggal dari start_time
            scheduleId: event.ID,
            shiftId: event.shift_id,
            hostId: event.host_id,
            hostName: event.host.Name,
            rawData: event,
          },
        }));

        setEvents(events);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const container = document.getElementById("table-schedule");

    if (container) {
      container.innerHTML = "";
    }

    if (calendarRef.current) {
      calendarRef.current = document.getElementById("table-schedule");

      calendarInstanceRef.current = EventCalendar.create(calendarRef.current, {
        view: "resourceTimelineDay",
        headerToolbar: {
          start: "title prev,next",
          center: "",
          end: "resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth",
        },
        resources: studio,
        scrollTime: `${new Date(new Date().getTime() - 10 * 60 * 1000)
          .toTimeString()
          .slice(0, 8)}`,
        events: events,
        eventClick: ({ event }) => setSelectedEvent(event),
        dayMaxEvents: true,
        nowIndicator: true,
        buttonText: {
          resourceTimelineDay: "Day",
          resourceTimelineWeek: "Week",
          resourceTimelineMonth: "Month",
        },
      });
    }

    if (calendarInstanceRef.current?.destroy) {
      calendarInstanceRef.current.destroy?.(); // gunakan destroy milik instance
      calendarInstanceRef.current = null;
    }
  }, [studio, events]);

  useEffect(() => {
    if (selectedEvent) {
      const rawData = selectedEvent.extendedProps.rawData;

      form.setValue("host_id", String(rawData.host_id));
      form.setValue("shift_id", String(rawData.shift_id)); // Ambil tanggal dari start_time
      form.setValue("date", rawData.start_time.slice(0, 10));
    }
  }, [selectedEvent]);

  async function handleDelete() {
    if (!selectedEvent) return;

    const scheduleId = selectedEvent.extendedProps.scheduleId;

    try {
      await deleteSchedule(scheduleId);

      toast.success("Jadwal berhasil dihapus");
      setSelectedEvent(null);

      calendarInstanceRef.current?.refetchEvents();
      setEvents((prevEvents) =>
        prevEvents.filter(
          (event) => event.extendedProps.scheduleId !== scheduleId
        )
      );
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Terjadi kesalahan saat menghapus jadwal");
    }
  }

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="flex gap-2 mb-4">
        <Button variant="default" className="w-max" asChild>
          <Link to="/host/schedule/create">
            <IconCalendarPlus />
            Tambah Jadwal
          </Link>
        </Button>
        <Button variant="default" className="w-max" asChild>
          <Link to="/host/schedule/shift-management/all">
            <IconClockCog />
            Manajemen Shift
          </Link>
        </Button>
        <Button variant="default" className="w-max" asChild>
          <Link to="/host/schedule/switch">
            <IconSwitchHorizontal />
            Switch Jadwal
          </Link>
        </Button>
      </div>
      <div id="table-schedule" ref={calendarRef} />
      <Sheet
        className="bg-white z-[999]"
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <SheetContent>
          <SheetHeader className="mt-10">
            <SheetTitle>Detail Jadwal</SheetTitle>
          </SheetHeader>

          <div className="px-4 flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold">Name</p>
              <h1 className="text-xl font-bold">{selectedEvent?.title}</h1>
            </div>
            <div>
              <p className="text-sm font-semibold">Host</p>
              <h1 className="text-xl font-bold">
                {selectedEvent?.extendedProps.hostName}
              </h1>
            </div>
            <div>
              <p className="text-sm font-semibold">Tanggal</p>
              <h1 className="text-xl font-bold">
                {selectedEvent?.extendedProps.date}
              </h1>
            </div>
            <div>
              <p className="text-sm font-semibold">Waktu Mulai</p>
              <h1 className="text-xl font-bold">
                {formatTime(selectedEvent?.start)}
              </h1>
            </div>
            <div>
              <p className="text-sm font-semibold">Waktu Selesai</p>
              <h1 className="text-xl font-bold">
                {formatTime(selectedEvent?.end)}
              </h1>
            </div>
          </div>

          <SheetFooter>
            {/* Tombol Edit */}
            <Button type="button" asChild>
              <Link
                to={`/host/schedule/${selectedEvent?.extendedProps.scheduleId}/edit`}
              >
                Edit
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah kamu yakin ingin menghapus jadwal ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini tidak dapat dibatalkan. Jadwal akan dihapus
                    secara permanen dari sistem.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-rose-500 hover:bg-rose-700 text-white"
                    onClick={handleDelete}
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
}
