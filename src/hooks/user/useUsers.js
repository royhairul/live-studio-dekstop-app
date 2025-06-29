import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const { status, result, error } = await getRequest(
        apiEndpoints.superadmin.index(),
        { auth: true }
      );

      if (status) {
        setUsers(result.data);
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

  return { users, error, refetch: fetchData };
};
