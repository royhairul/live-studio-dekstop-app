import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const useHosts = () => {
  const [hosts, setHosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const { status, result, error } = await getRequest(
        apiEndpoints.host.index()
      );

      if (status) {
        setHosts(result.data);
      } else {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { hosts, error, refetch: fetchData };
};
