import { apiEndpoints } from "@/config/api";
import { apiPublic } from "@/lib/useApi";
import { useMutation } from "@tanstack/react-query";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (values) =>
      apiPublic.post(apiEndpoints.auth.forgotPassword(), values),
    onSuccess: async (response) => {
      const data = response.data;
      sessionStorage.setItem("email", data.data);
    },
  });
}
