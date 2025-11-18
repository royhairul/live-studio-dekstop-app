import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useEffect, useState } from "react";

export const useHostsGroupedByStudio = (selectedStudioId) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, result, errors } = await apiSecure.get(
          apiEndpoints.host.groupedByStudio()
        );
        if (status) {
          // let rawData = result.data || {};
          // let data = [];

          // // console.log(apiEndpoints.host.groupedByStudio);
          // if (selectedStudioId && selectedStudioId !== "all") {
          //   data = rawData[selectedStudioId] || [];
          // } else {
          //   data = Object.values(rawData).flat();
          // }

          setData(result.data);
        } else {
          setError(error);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [selectedStudioId]);
  return { data, error };
};
