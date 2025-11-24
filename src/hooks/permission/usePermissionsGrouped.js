import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useEffect, useState } from "react";

export const usePermissionGrouped = () => {
  const [permissions, setPermissions] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { status, data: result, error } = await apiSecure.get(
          apiEndpoints.permission.grouped()
        );

        if (status) {
          setPermissions(result.data);
        } else {
          setError(error);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { permissions, loading, error };
};