import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useShifts = () => {
  return useQuery({
    queryKey: ["shifts"],
    queryFn: async () => {
      const res = await axios.get(apiEndpoints.shift.index());
      return res.data.data;
    },
    initialData: [],
  });
};
