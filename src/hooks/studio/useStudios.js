import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const useStudios = () => {
  const [studio, setStudio] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await apiSecure.get(
        apiEndpoints.studio.index()
      );

      console.log(res);

      const { status, data, error } = res;

      if (status) {
        setStudio(data.data);
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

  return { studio, error, refecth: fetchData };
};
