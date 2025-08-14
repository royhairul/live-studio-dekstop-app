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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiEndpoints, baseUrl } from "@/config/api";
import { useShiftById } from "@/hooks/shift/useShiftById";
import { formatTime } from "@/helpers/formatTime";
import { putRequest } from "@/lib/useApi";
import { toast } from "sonner";

export default function ShiftEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { shift } = useShiftById(id);

  const formSchema = z
    .object({
      name: z.string().min(1, { message: "Shift name is required." }),
      start_time: z.string().min(1, { message: "Start time is required." }),
      end_time: z.string().min(1, { message: "End time is required." }),
    })
    .refine(
      (data) => {
        const startTime = data.start_time;
        const endTime = data.end_time;
        return startTime < endTime;
      },
      {
        message: "End time must be after start time.",
        path: ["end_time"],
      }
    );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      start_time: "",
      end_time: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: shift?.name || "",
      start_time: formatTime(shift?.start_time) || "",
      end_time: formatTime(shift?.end_time) || "",
    });
  }, [shift, form]);

  const breadcrumbs = [
    {
      icon: IconSettings,
      label: "Setting",
      url: "/setting/shift",
    },
    {
      label: "Shift",
      url: "/setting/shift",
    },
    {
      label: `Edit Shift ${shift?.name}`,
    },
  ];

  const handleEdit = async (values) => {
    try {
      const { status, result, errors } = await putRequest(
        apiEndpoints.shift.edit(id),
        values
      );

      if (status) {
        toast.success(result["message"]);
        setTimeout(() => {
          navigate("/setting/shift");
        }, 3000);
      } else {
        toast.error(result);
      }
    } catch (error) {
      toast.error(error);
      console.error("Network error:", error);
    }
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="sm:w-1/2 p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold">Edit Shift</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEdit)}
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
                        label="Nama Shift"
                        type="text"
                        placeholder="Masukkan Nama Shift..."
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
              name="start_time"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="start_time"
                        label="Jam Mulai"
                        type="time"
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
              name="end_time"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="end_time"
                        label="Jam Selesai"
                        type="time"
                        {...field}
                      />
                    </FormControl>
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
