import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const formatDate = (date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

const buildDateParams = (range) => {
    const params = {};
    if (range?.from) params.startDate = formatDate(range.from);
    if (range?.to) params.endDate = formatDate(range.to);
    return params;
};

export default function useDateRangeQuery({
    queryKey,
    url,
    id = null,
    range = null,     
    enabled = true,
}) {
    const [appliedRange, setAppliedRange] = useState(range);

    const query = useQuery({
        queryKey: id
            ? [...queryKey, id, appliedRange?.from, appliedRange?.to]
            : [...queryKey, appliedRange?.from, appliedRange?.to],
        queryFn: async () => {
            const params = buildDateParams(appliedRange);
            const res = await axios.get(url, { params });
            return res.data.data;
        },
        enabled: enabled && (id ? !!id : true),
    });

    const handleApplyDateRange = (range) => {
        setAppliedRange(range);
    };

    return {
        ...query,
        handleApplyDateRange, // 🔹 tetap ada seperti versi lama
    };
}
