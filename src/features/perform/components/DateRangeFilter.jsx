import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/Datepicker";
import { useState } from "react";

export default function DateRangeFilter({ onApply, isLoading, dateRange }) {

    const [draftRange, setDraftRange] = useState(dateRange);

    const handleApply = () => {
        if (!draftRange?.from || !draftRange?.to) return;
        onApply(draftRange);
    };

    return (
        <div className="flex gap-2 items-center">
            <DatePicker
                withRange="true"
                value={draftRange}
                onChange={setDraftRange}
                className="w-full sm:w-auto"
            />
            <Button onClick={handleApply} disabled={isLoading}>
                {isLoading ? "Memuat..." : "Terapkan"}
            </Button>
        </div>
    );
}
