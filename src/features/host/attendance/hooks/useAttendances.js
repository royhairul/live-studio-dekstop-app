import { useQuery } from "@tanstack/react-query";
import { apiEndpoints } from "@/config/api";
import axios from "axios";

export const useAttendances = () => {
  return useQuery({
    queryKey: ["attendances"],
    queryFn: async () => {
      const res = await axios.get(apiEndpoints.attendance.uncheckedOut());
      return res.data.data;
    },
  });
};
