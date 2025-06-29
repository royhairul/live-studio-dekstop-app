import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useEffect, useState } from "react";

export const usePermissionGrouped = () => {
  const [permissions, setPermissions] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, result, error } = await getRequest(
          apiEndpoints.permission.grouped()
        );

        if (status) {
          setPermissions(result.data);
        } else {
          setError(error);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { permissions, error };
};
