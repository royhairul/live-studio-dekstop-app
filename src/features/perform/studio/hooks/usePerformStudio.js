import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const usePerformStudio = () => {
    const [studio, setStudio] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const { status, result, error } = await getRequest(
                apiEndpoints.perform.studio()
            );

            if (status) {
                setStudio(result.data);
            } else {
                setError(error);
            }
        } catch (error) {
            setError(error);
        }finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { studio, error, refetch: fetchData, isLoading };
};
