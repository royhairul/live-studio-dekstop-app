import { apiEndpoints } from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useCreateHost() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values) => axios.post(apiEndpoints.host.create(), values),
    onSuccess: async (response) => {
      const res = response.data;
      toast.success("Buat Host", { description: res.message });
      navigate("/host/all");
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
