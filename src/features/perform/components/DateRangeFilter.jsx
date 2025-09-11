import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/Datepicker";
import { useState } from "react";

export default function DateRangeFilter({ onApply, isLoading }) {
    const [dateRange, setDateRange] = useState(null);

    const handleApply = () => {
        if (!dateRange?.from || !dateRange?.to) return;
        onApply(dateRange);
    };

    return (
        <div className="flex gap-2 items-center">
            <DatePicker
                withRange="true"
                value={dateRange}
                onChange={setDateRange}
                className="w-full sm:w-auto"
            />
            <Button onClick={handleApply} disabled={isLoading}>
                {isLoading ? "Memuat..." : "Terapkan"}
            </Button>
        </div>
    );
}
