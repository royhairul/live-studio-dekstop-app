import { useState } from "react";
import MainLayout from "@/layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  IconCalendarCheck,
  IconCalendarExclamation,
  IconCalendarX,
  IconDoorEnter,
  IconDoorExit,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/datepicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useShifts } from "@/hooks/shift/useShifts";
import { formatTime } from "@/helpers/formatTime";
import { useScheduledHosts } from "@/hooks/host-schedule/useScheduledHosts";
import { formatInTimeZone } from "date-fns-tz";
import { checkinSchema } from "./schema/checkin-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { apiEndpoints } from "@/config/api";
import { useAttendances } from "./hooks/useAttendances";
import { checkoutSchema } from "./schema/checkout-schema";
import { cn } from "@/lib/utils";
import { useHosts } from "../hooks/useHosts";
import { useStudios } from "@/hooks/studio/useStudios";

export default function HostAttendancePage() {
  const queryClient = useQueryClient();
  const { data: hosts } = useHosts();
  const { data: attendances } = useAttendances();
  const { data: shifts } = useShifts();
  const { studio } = useStudios();
  const [selectedHosts, setSelectedHosts] = useState([]);
  const [selectedAttendances, setSelectedAttendances] = useState([]);

  const getSelectedHostNames = () => {
    if (!hosts) return "";
    return hosts
      .flat()
      .filter((host) => selectedHosts.includes(host.id))
      .map((host) => host.name)
      .join(", ");
  };

  const formCheckIn = useForm({
    resolver: zodResolver(checkinSchema),
    defaultValues: {
      host_ids: [],
      shift_id: "",
      date: new Date().toISOString(),
      attendance: "checkIn",
    },
  });
  const formCheckOut = useForm({
    // resolver: zodResolver(checkoutSchema),
    defaultValues: {
      id: [],
    },
  });

  const { data: scheduledHosts = [] } = useScheduledHosts(
    formatInTimeZone(formCheckIn.watch("date"), "Asia/Jakarta", "y-MM-dd"),
    formCheckIn.watch("shift_id")
  );
  const breadcrumbs = [
    {
      icon: IconUsersGroup,
      label: "Presensi Host",
    },
  ];

  const checkInMutation = useMutation({
    mutationFn: (values) =>
      axios.post(apiEndpoints.attendance.checkIn(), values),
    onSuccess: (response) => {
      const data = response.data.data;
      toast.success(data["message"]);

      console.warn(response);

      queryClient.invalidateQueries(["attendances"]);

      setSelectedHosts([]);
      formCheckIn.reset();
    },
    onError: (error) => {
      const errors = error.response.data.details;

      console.log(errors);

      const successedHost = errors.results
        .filter(({ status }) => status === "success")
        .map(({ host_name }) => host_name);

      const failedHost = errors.results
        .filter(({ status }) => status === "failed")
        .map(({ host_name }) => host_name);

      console.log(successedHost);

      if (successedHost.length > 0) {
        toast.success(`${successedHost.join(", ")} telah melakukan check-in`);
      } else {
        toast.error("Gagal check-in", {
          description:
            failedHost.length > 0
              ? `\n${failedHost.join(", ")}  belum melakukan checkout`
              : "",
        });
      }
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: (values) =>
      axios.post(apiEndpoints.attendance.checkOut(), values),
    onSuccess: (response) => {
      console.log("Data", response.data.data);
      const data = response.data.data;
      toast.success(data["message"]);

      queryClient.invalidateQueries(["attendances"]);
    },
    onError: (error) => {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Gagal check-out";
      toast.error(errorMsg);
    },
  });

  console.log(formCheckIn.formState.errors);
  console.log(formCheckOut.formState.errors);

  const handleCheckIn = async (values) => {
    console.log("Check In Values:", values);
    checkInMutation.mutate(values);
  };

  const handleCheckOut = async (values) => {
    console.log("🧾 Check Out Values:", values);
    // checkOutMutation.mutate(values);
  }

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Presensi Kehadiran */}
        <div className="w-full p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
          <h2 className="font-semibold">Presensi Kehadiran</h2>

          <Tabs defaultValue="check_out" className="w-full">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="check_in" className="flex items-center gap-1">
                <IconDoorEnter className="w-4 h-4" /> Check In
              </TabsTrigger>
              <TabsTrigger value="check_out" className="flex items-center gap-1">
                <IconDoorExit className="w-4 h-4" /> Check Out
              </TabsTrigger>
            </TabsList>

            {/* Tab Check In */}
            <TabsContent value="check_in">
              <div className="mt-4 bg-primary w-max p-2 rounded">
                <IconDoorEnter className="text-white" />
              </div>
              <h2 className="font-bold text-primary mt-4">Check In</h2>
              <p className="text-sm/6 text-muted-foreground font-medium mb-6">
                Submit your attendance for check in
              </p>

              <Form {...formCheckIn}>
                <form
                  onSubmit={formCheckIn.handleSubmit(handleCheckIn)}
                  className="flex flex-col gap-4"
                >
                  {/* Shift */}
                  <FormField
                    control={formCheckIn.control}
                    name="shift_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shift</FormLabel>
                        <Select
                          onValueChange={(val) => field.onChange(val)}
                          value={field.value ? String(field.value) : ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih Shift..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shifts.map((shift) => (
                              <SelectItem key={shift.id} value={String(shift.id)}>
                                {shift.name} ({formatTime(shift.start_time)} -{" "}
                                {formatTime(shift.end_time)})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Studio */}
                  <FormField
                    control={formCheckIn.control}
                    name="studio_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Studio</FormLabel>
                        <Select
                          onValueChange={(val) => field.onChange(val)}
                          value={field.value ? String(field.value) : ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih Studio..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {studio.map((s) => (
                              <SelectItem key={s.id} value={String(s.id)}>
                                {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Host */}
                  <FormField
                    control={formCheckIn.control}
                    name="host_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Host</FormLabel>
                        <Select
                          onValueChange={(val) => field.onChange(val)}
                          value={field.value ? String(field.value) : ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih Host..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hosts.map((host) => (
                              <SelectItem key={host.id} value={String(host.id)}>
                                {host.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full text-white bg-primary">
                    Submit
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* Tab Check Out */}
            <TabsContent value="check_out">
              <div className="mt-4 bg-primary w-max p-2 rounded">
                <IconDoorExit className="text-white" />
              </div>
              <h2 className="font-bold text-primary mt-4">Check Out</h2>
              <p className="text-sm/6 text-muted-foreground font-medium mb-6">
                Submit your attendance for check out
              </p>

              <Form {...formCheckOut}>
                <form
                  onSubmit={formCheckOut.handleSubmit(handleCheckOut)}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={formCheckOut.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daftar Host Sudah Check-In</FormLabel>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                          {attendances?.length > 0 ? (
                            attendances.map((attendance) => (
                              <div
                                key={attendance.id}
                                className="flex items-center gap-2 py-2 border-b border-gray-200"
                              >
                                <Checkbox
                                  id={`attendance-${attendance.id}`}
                                  checked={selectedAttendances.includes(
                                    attendance.id
                                  )}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...selectedAttendances, attendance.id]
                                      : selectedAttendances.filter((id) => id !== attendance.id);
                                    setSelectedAttendances(newValue);
                                    formCheckOut.setValue("id", newValue, { shouldValidate: true });
                                  }}
                                />
                                <Label
                                  htmlFor={`attendance-${attendance.id}`}
                                  className="w-full flex justify-between text-sm leading-none"
                                >
                                  <span>{attendance.host_name || "Tanpa Nama"}</span>
                                  <Badge
                                    className={cn(
                                      "capitalize",
                                      attendance.note === "sesuai jadwal"
                                        ? "bg-primary/10 text-primary"
                                        : "bg-amber-600/10 text-amber-600"
                                    )}
                                  >
                                    {attendance.note === "sesuai jadwal" ? (
                                      <IconCalendarCheck />
                                    ) : (
                                      <IconCalendarX />
                                    )}
                                    {attendance.note}
                                  </Badge>
                                </Label>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 bg-muted-foreground/15 text-sm text-muted-foreground italic">
                              Belum ada host yang check-in.
                            </div>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full text-white bg-primary">
                    Check OUT
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Slot kosong untuk kartu tambahan biar responsif */}
        <div className="w-full hidden lg:block"></div>
      </div>
    </MainLayout>
  );

}
