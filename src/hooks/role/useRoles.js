import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await apiSecure.get(
        apiEndpoints.role.index()
      );

      console.log(res);

      const { status, data: result, error } = res;

      if (status) {
        setRoles(result.data);
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

  return { roles, error, refetch: fetchData };
};
