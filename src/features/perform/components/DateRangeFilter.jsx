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
        <div className="flex sm:items-center gap-2 w-max">
            <DatePicker
                withRange={true}
                value={draftRange}
                onChange={setDraftRange}
            />
            <Button
                onClick={handleApply}
                disabled={isLoading}
                className="w-max"
            >
                {isLoading ? "Memuat..." : "Terapkan"}
            </Button>
        </div>

    );
}
