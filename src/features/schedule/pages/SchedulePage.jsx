import { useRef, useEffect, useState } from "react";
import MainLayout from "@/layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  IconCalendarPlus,
  IconSwitchHorizontal,
  IconSettings,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { deleteSchedule } from "@/services/scheduleService";
import { useHostsGroupedByStudio } from "@/hooks/host/useHostsGroupedByStudio";

export default function HostSchedulePage() {
  const calendarRef = useRef(null);
  const calendarInstanceRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
      icon: IconSettings,
      label: "Setting",
      url: "/setting/schedule",
    },
    {
      label: "Jadwal",
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
      new Error("Invalid date format", e);
      return "";
    }
  }


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
        resources: hostGrouped,
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
  }, [hostGrouped, events]);

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
          <Link to="/setting/schedule/create">
            <IconCalendarPlus />
            Tambah Jadwal
          </Link>
        </Button>
        <Button variant="default" className="w-max" asChild>
          <Link to="/setting/schedule/switch">
            <IconSwitchHorizontal />
            Tukar Jadwal
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
