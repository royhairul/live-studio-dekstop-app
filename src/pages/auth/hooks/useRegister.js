import { apiEndpoints } from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values) => axios.post(apiEndpoints.host.create(), values),
    onSuccess: async () => {

      toast.success("Register Success", { description: "Welcome to LINCY" });

      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      
      let errorMsg = "An error occurred. Please try again.";

      if (!error.response) {
        errorMsg = "Unable to connect to the server.";
      } else {
        errorMsg = error.response?.data?.message || "Failed to register";
      }

      toast.error("Register Error", {
        description: errorMsg,
      });
    },
  });
}
