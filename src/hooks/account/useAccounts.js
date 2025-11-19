import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useQuery } from "@tanstack/react-query";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await apiSecure.get(apiEndpoints.account.index());
      console.log(res);
      
      return res.data.data;
    },
    onSuccess: (data) => {
      console.log("Fetched accounts:", data);
    },
    initialData: [],
  });
};
