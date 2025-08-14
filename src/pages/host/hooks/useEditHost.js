import { apiEndpoints } from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useEditHost(id) {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["host", id],
    mutationFn: (values) => axios.put(apiEndpoints.host.edit(id), values),
    onSuccess: async (response) => {
      const res = response.data;
      toast.success("Edit Host", { description: res.message });
      navigate("/management/host");
    },

    onError: (error) => {
      let errorMsg = "Terjadi kesalahan. Silahkan coba lagi.";

      if (!error.response) {
        errorMsg = "Tidak dapat terhubung dengan server.";
      } else {
        errorMsg = error.response?.data?.message || "Failed to edit host";
      }

      toast.error("Gagal edit host", {
        description: errorMsg,
      });
    },
  });
}
