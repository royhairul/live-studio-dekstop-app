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
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { baseUrl } from "@/config/api";

export default function ShiftCreatePage() {
  const navigate = useNavigate();
  const [studio, setStudio] = useState([]);

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
      label: "Shift",
      url: "/host/schedule/shift-management/all",
    },
    {
      label: "Create",
    },
  ];

  const handleCreateShift = async (values) => {
    console.log(JSON.stringify(values));
    try {
      const response = await fetch(`${baseUrl}/shift/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/host/schedule/shift-management/all");
      } else {
        const errorData = await response.json();
        console.error("Error creating shift:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold">Tambah Shift Baru</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateShift)}
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
