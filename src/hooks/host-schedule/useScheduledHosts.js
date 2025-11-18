import { useQuery } from "@tanstack/react-query";
import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";

export const useScheduledHosts = (date, shiftId) => {
  return useQuery({
    queryKey: ["scheduled-hosts", date, shiftId],
    queryFn: async () => {
      if (!date || !shiftId) return [];
      const res = await apiSecure.get(
        apiEndpoints.schedule.scheduled(date, shiftId)
      );
      return res.data.data;
    },
    enabled: !!date && !!shiftId,
  });
};
