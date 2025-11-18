import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const useShiftById = (id) => {
  const [shift, setShift] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const { status, result, errors } = await apiSecure.get(
        apiEndpoints.shift.show(id)
      );

      if (status) {
        const data = result?.data || [];
        setShift(data);
      } else {
        setError(errors || "Terjadi kesalahan saat memuat shift.");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan jaringan.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { shift, error, refetch: fetchData };
};
