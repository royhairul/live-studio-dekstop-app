import { useQuery } from "@tanstack/react-query";
import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";

export const useAttendances = () => {
  return useQuery({
    queryKey: ["attendances"],
    queryFn: async () => {
      const res = await apiSecure.get(apiEndpoints.attendance.uncheckedOut());
      return res.data.data;
    },
  });
};
