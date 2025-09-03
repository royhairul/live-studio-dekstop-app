import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useCallback, useEffect, useState } from "react";

export const usePerformStudioDetail = (id) => {
    const [studioDetail, setStudio] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const { status, result, error } = await getRequest(
                apiEndpoints.perform.studioDetail(id)
            );

            if (status) {
                setStudio(result.data);
            } else {
                setError(error);
            }
        } catch (error) {
            setError(error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { studioDetail, error, refetch: fetchData };
};
