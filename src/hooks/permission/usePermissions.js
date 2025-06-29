import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useEffect, useState } from "react";

export const usePermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, result, error } = getRequest(
          apiEndpoints.permission.index()
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
