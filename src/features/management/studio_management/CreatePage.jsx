import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IconId,
  IconReplaceUser,
  IconSettings,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { toast } from "sonner";

export default function MStudioCreatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, { message: "Studio name is required." }),
    address: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const breadcrumbs = [
    {
      icon: IconId,
      label: "Master",
      url: "/management/studio",
    },
    {
      label: "Daftar Studio",
      url: "/management/studio",
    },
    {
      label: "Buat Studio",
    },
  ];

  const handleCreate = async (values) => {
    try {
      const { status, result, errors } = await apiSecure.post(
        apiEndpoints.studio.create(),
        values
      );
      if (status) {
        toast.success(result["message"]);
        navigate("/management/studio");
      } else {
        toast.error(result);
      }
    } catch (error) {
      // console.error("Create Studio error:", error);
      // form.setError("name", {
      //   message: "Something error when create data.",
      // });
      toast.error(error);
    }
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="sm:w-1/2 p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold tracking-tight text-primary">
          Tambah Studio Baru
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreate)}
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
                        type="text"
                        label="Nama Studio"
                        placeholder="Masukkan Nama Studio..."
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
              name="address"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="address"
                        type="text"
                        label="Alamat Studio"
                        placeholder="Masukkan Alamat Studio..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="w-full text-white bg-primary">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
