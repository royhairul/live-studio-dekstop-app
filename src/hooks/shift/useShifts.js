import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useQuery } from "@tanstack/react-query";

export const useShifts = () => {
  return useQuery({
    queryKey: ["shifts"],
    queryFn: async () => {
      const res = await apiSecure.get(apiEndpoints.shift.index());      
      return res.data.data;
    },
    initialData: [],
  });
};
