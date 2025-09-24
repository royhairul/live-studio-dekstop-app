import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useState } from "react"
import { id } from "date-fns/locale"

export function DatePicker({ value, onChange }) {
    const [date, setDate] = useState(value ? new Date(value) : undefined)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost" 
                    className="w-full justify-start text-left font-normal shadow-none border border-accent rounded-sm bg-white hover:bg-white hover:text-black focus:ring-2  focus:ring-black"
                >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    {date ? format(date, "d MMMM yyyy", { locale: id }) : (
                        <span className="text-gray-400">Pilih tanggal</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                        setDate(d)
                        onChange(d?.toISOString().split("T")[0] || "")
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}