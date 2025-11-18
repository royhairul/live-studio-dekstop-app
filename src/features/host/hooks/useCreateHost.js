import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useCreateHost() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values) => apiSecure.post(apiEndpoints.host.create(), values),
    onSuccess: async (response) => {
      const res = response.data;
      toast.success("Buat Host", { description: res.message });
      navigate("/management/host");
    },
    onError: (error) => {
      let errorMsg = "Terjadi kesalahan. Silahkan coba lagi.";

      if (!error.response) {
        errorMsg = "Tidak dapat terhubung dengan server.";
      } else {
        errorMsg = error.response?.data?.message || "Failed to create host";
      }

      toast.error("Gagal membuat host", {
        description: errorMsg,
      });
    },
  });
}
