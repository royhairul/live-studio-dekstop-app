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
      

      if (response.ok === false) {
        toast.error("Login Error", {
          description: response.data?.error || "Login tidak valid",
        });
        return;
      }

      const data = response.data;
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
      console.log(error);

      let errorMsg = "Terjadi kesalahan. Silahkan coba lagi.";

      if (!error.response) {
        errorMsg = "Tidak dapat terhubung dengan server.";
      } else {
        errorMsg = error.response?.data?.error || "Failed to login";
      }

      toast.error("Login Error", {
        description: errorMsg,
      });
    },
  });
}
