import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useEffect, useState } from "react";

export const useRolesById = (id) => {
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { status, data: result, error } = await apiSecure.get(
          apiEndpoints.role.show(id)
        );

        if (status) {
          setRoles(result.data);
        } else {
          setError(error);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { roles, loading, error };
};