import { useAuth } from "@/auth/AuthContext";
import { apiEndpoints } from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogin() {
  const { login, rememberMe, clearRememberMe } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values) => axios.post(apiEndpoints.auth.login(), values),
    onSuccess: async (response, variables) => {
      const data = response.data.data;

      login(data.access_token);

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

      if (!error.response) {
        errorMsg = "Tidak dapat terhubung dengan server.";
      } else {
        errorMsg = error.response?.data?.message || "Failed to login";
      }

      toast.error("Login Error", {
        description: errorMsg,
      });
    },
  });
}
