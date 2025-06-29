import { apiEndpoints } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await axios.get(apiEndpoints.account.index());
      return res.data.data;
    },
    onSuccess: (data) => {
      console.log("Fetched accounts:", data);
    },
    initialData: [],
  });
};
