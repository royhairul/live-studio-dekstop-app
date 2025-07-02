import { apiEndpoints } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useHostById = (id) => {
  return useQuery({
    queryKey: ["host", id],
    queryFn: async () => {
      const { status, data } = await axios.get(apiEndpoints.host.show(id));
      return data?.data ?? null;
    },
    enabled: !!id,
  });
};
