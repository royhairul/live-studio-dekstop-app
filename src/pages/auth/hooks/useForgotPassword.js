import { apiEndpoints } from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (values) =>
      axios.post(apiEndpoints.auth.forgotPassword(), values),
    onSuccess: async (response) => {
      const data = response.data;
      sessionStorage.setItem("email", data.email);
    },
  });
}
