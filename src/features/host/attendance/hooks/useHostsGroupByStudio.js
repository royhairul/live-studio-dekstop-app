import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useQuery } from "@tanstack/react-query";

export const useHostsGroupedByStudio = () => {
  return useQuery({
    queryKey: ["hosts"],
    queryFn: async () => {
      const res = await apiSecure.get(apiEndpoints.host.groupedByStudio());
      return res.data.data;
    },
    initialData: [],
  });
};
