import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const { status, result, error } = await getRequest(
        apiEndpoints.role.index()
      );

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
