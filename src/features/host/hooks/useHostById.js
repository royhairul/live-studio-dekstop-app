import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useQuery } from "@tanstack/react-query";

export const useHostById = (id) => {
  return useQuery({
    queryKey: ["host", id],
    queryFn: async () => {
      const { status, data } = await apiSecure.get(apiEndpoints.host.show(id));
      return data?.data ?? null;
    },
    enabled: !!id,
  });
};
