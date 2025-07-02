import { apiEndpoints } from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useDeleteHost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => axios.delete(apiEndpoints.host.delete(id)),
    onSuccess: (response) => {
      const res = response.data;
      toast.success("Hapus Host", { description: res.message });
      queryClient.invalidateQueries({ queryKey: ["hosts"] });
    },
    onError: (error) => {
      let errorMsg = "Terjadi kesalahan. Silahkan coba lagi.";

      if (!error.response) {
        errorMsg = "Tidak dapat terhubung dengan server.";
      } else {
        errorMsg = error.response?.data?.message || "Failed to delete host";
      }

      toast.error("Gagal menghapus host", {
        description: errorMsg,
      });
    },
  });
}
