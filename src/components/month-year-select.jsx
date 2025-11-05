import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function MonthYearSelect({
    value, 
    onChange,
    yearRange = 5,
    withDefault = false, 
    defaultValue = `${months[new Date().getMonth()]} ${new Date().getFullYear()}`
}) {
    const currentYear = new Date().getFullYear();

    const effectiveValue = value || (withDefault ? defaultValue : "");

    // parse hanya kalau ada value
    let monthIndex = "";
    let year = "";
    if (effectiveValue) {
        const [monthName, yearStr] = effectiveValue.split(" ");
        monthIndex = months.indexOf(monthName) + 1;
        year = Number(yearStr);
    }

    const handleChange = (m, y) => {
        onChange?.(`${months[m - 1]} ${y}`);
    };

    return (
        <div className="flex gap-2">
            {/* Select Bulan */}
            <Select
                value={monthIndex ? String(monthIndex) : ""}
                onValueChange={(v) => handleChange(Number(v), year || currentYear)}
            >
                <SelectTrigger className="w-40 sm:w-full border-accent bg-transparent border p-2 rounded-sm hover:cursor-pointer">
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
                value={year ? String(year) : ""}
                onValueChange={(v) => handleChange(monthIndex || 1, Number(v))}
            >
                <SelectTrigger className="border-accent border p-2 bg-transparent rounded-sm w-20 sm:w-full hover:cursor-pointer">
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
