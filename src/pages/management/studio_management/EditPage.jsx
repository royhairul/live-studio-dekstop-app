import MainLayout from "@/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSettings, IconUsersGroup } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
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
import { apiEndpoints, baseUrl } from "@/config/api";
import { putRequest } from "@/lib/useApi";
import { toast } from "sonner";

export default function MStudioEditPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();

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
      icon: IconSettings,
      label: "Setting",
      url: "/account/all",
    },
    {
      label: "Studio Management",
      url: "/setting/studio-management",
    },
    {
      label: "Edit Studio",
    },
  ];

  useEffect(() => {
    try {
      // Fetch data for the specific studio
      async function fetchStudioData() {
        const res = await fetch(`${baseUrl}/studio/${id}`);
        const json = await res.json();
        const studioData = json.data;

        if (studioData) {
          form.reset({
            name: studioData.Name,
            address: studioData.Address,
          });
        }
      }
      fetchStudioData();
    } catch (error) {
      console.error("Error fetching studio data:", error);
    }
  }, []);

  const handleUpdate = async (values) => {
    console.log(values);
    try {
      const { status, result } = await putRequest(
        apiEndpoints.studio.edit(id),
        values
      );

      if (status) {
        toast.success(result["message"]);
        setTimeout(() => {
          navigate("/setting/studio-management");
        }, 3000);
      } else {
        toast.error(result["message"]);
      }
    } catch (error) {
      console.error("Update Studio error:", error);
      toast.error(result["message"]);
    }
  };

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="sm:w-1/2 p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md">
        <h2 className="font-semibold tracking-tight text-primary">
          Edit Studio Baru
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
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
