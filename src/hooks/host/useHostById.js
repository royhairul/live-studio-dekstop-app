import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const useHostById = (id) => {
  const [host, setHost] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const { status, result, error } = await apiSecure.get(
        apiEndpoints.host.show(id)
      );

      if (status) {
        setHost(result.data);
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

  return { host, error, refetch: fetchData };
};
