
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function MonthYearSelect({ value, onChange, yearRange = 5 }) {
    const currentYear = new Date().getFullYear();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(currentYear);

    useEffect(() => {
        if (value) {
            const [m, y] = value.split(" ");
            const monthIndex = months.indexOf(m) + 1;
            if (monthIndex > 0 && y) {
                setMonth(monthIndex);
                setYear(Number(y));
            }
        }
    }, [value]);

    const handleChange = (m, y) => {
        const formatted = `${months[m - 1]} ${y}`; 
        onChange(formatted);
    };

    return (
        <div className="flex gap-2">
            {/* Select Bulan */}
            <Select
                value={String(month)}
                onValueChange={(v) => {
                    setMonth(Number(v));
                    handleChange(Number(v), year);
                }}
            >
                <SelectTrigger className="w-full border-accent border p-2 rounded-sm hover:cursor-pointer">
                    <SelectValue placeholder="Pilih bulan" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((m, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                            {m}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Select Tahun */}
            <Select
                value={String(year)}
                onValueChange={(v) => {
                    setYear(Number(v));
                    handleChange(month, Number(v));
                }}
            >
                <SelectTrigger className="border-accent border p-2 rounded-sm w-[180px] hover:cursor-pointer">
                    <SelectValue placeholder="Pilih tahun" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: yearRange * 2 + 1 }, (_, i) => currentYear - yearRange + i).map(
                        (y) => (
                            <SelectItem key={y} value={String(y)}>
                                {y}
                            </SelectItem>
                        )
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}
