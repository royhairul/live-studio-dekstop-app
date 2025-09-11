import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useMonthYearQuery({ queryKey, url, enabled = true }) {
    const now = new Date();
    const defaultPeriod = `${now.toLocaleString("en-US", { month: "long" })} ${now.getFullYear()}`;
    const [appliedPeriod, setAppliedPeriod] = useState(defaultPeriod);

    const query = useQuery({
        queryKey: [...queryKey, appliedPeriod],
        queryFn: async () => {
            if (!appliedPeriod) return []; // guard biar gak split null

            const [monthName, year] = appliedPeriod.split(" ");

            const params = {
                month: monthName,
                year: Number(year),
            };

            const res = await axios.get(url, { params });

            return res.data?.data ?? [];
        },
        enabled, // tetap aktif
        initialData: [], // biar data gak undefined
    });


    const handleApplyMonthYear = (period) => {
        setAppliedPeriod(period);
    };

    return {
        ...query,
        appliedPeriod,
        handleApplyMonthYear,
    };
}
