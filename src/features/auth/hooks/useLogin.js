import { useAuth } from "@/auth/AuthContext";
import { apiEndpoints } from "@/config/api";
import { apiPublic } from "@/lib/useApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogin() {
  const { login, rememberMe, clearRememberMe } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values) => apiPublic.post(apiEndpoints.auth.login(), values),
    onSuccess: async (response, variables) => {
      const data = response.data.data;

      login(data.accessToken);

      if (variables.rememberMe) {
        rememberMe(variables.email, variables.password);
      } else {
        clearRememberMe();
      }

      toast.success("Login Success", { description: "Welcome Back" });

      navigate("/dashboard");
    },
    onError: (error) => {
      let errorMsg = "Terjadi kesalahan. Silahkan coba lagi.";

      // Network error (server down, DNS error, CORS blocked, dll)
      if (error.status === 0) {
        errorMsg = "Tidak dapat terhubung dengan server.";
      }

      // Error dari backend (error.data.message)
      else if (error.data?.error) {
        errorMsg = error.data.error;
      }

      toast.error("Login Error", {
        description: errorMsg,
      });
    },
  });
}
