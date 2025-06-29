import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const useUserById = (id) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const { status, result, error } = await getRequest(
        apiEndpoints.superadmin.show(id),
        {
          auth: true,
        }
      );

      if (status) {
        setUser(result.data); // gunakan sesuai dengan response API kamu
        setError(null);
      } else {
        setError(error || "Failed to fetch user.");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat memuat data user.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { user, error, loading, refetch: fetchData };
};
