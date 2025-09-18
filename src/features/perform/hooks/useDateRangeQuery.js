import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const STORAGE_KEY = "customRange";

const formatDate = (date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

const buildDateParams = (range) => {
    const params = {};
    if (range?.from) params.startDate = formatDate(new Date(range.from));
    if (range?.to) params.endDate = formatDate(new Date(range.to));
    return params;
};

const normalizeRange = (range) => {
    if (!range) return null;
    return {
        from: range.from ? new Date(range.from) : null,
        to: range.to ? new Date(range.to) : null,
    };
};

export default function useDateRangeQuery({
    queryKey,
    url,
    id = null,
    range = null,
    enabled = true,
}) {
    const savedRange = (() => {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return normalizeRange(JSON.parse(raw));
        } catch {
            return null;
        }
    })();

    const [appliedRange, setAppliedRange] = useState(
        normalizeRange(savedRange || range)
    );

    const query = useQuery({
        queryKey: id
            ? [...queryKey, id, appliedRange?.from, appliedRange?.to]
            : [...queryKey, appliedRange?.from, appliedRange?.to],

        queryFn: async () => {
            const params = buildDateParams(appliedRange);
            const res = await axios.get(url, { params });
            return res.data.data;
        },
        enabled: !!appliedRange && enabled && (id ? !!id : true),
    });

    const handleApplyDateRange = (range) => {
        if (!range?.from || !range?.to) return;

        const normalized = normalizeRange(range);
        setAppliedRange(normalized);

        sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                from: normalized.from?.toISOString(),
                to: normalized.to?.toISOString(),
            })
        );
    };

    return {
        ...query,
        handleApplyDateRange,
        appliedRange,
        setAppliedRange,
    };
}
