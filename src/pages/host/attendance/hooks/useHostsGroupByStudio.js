import { apiEndpoints } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useHostsGroupedByStudio = () => {
  return useQuery({
    queryKey: ["hosts"],
    queryFn: async () => {
      const res = await axios.get(apiEndpoints.host.groupedByStudio());
      return res.data.data;
    },
    initialData: [],
  });
};
