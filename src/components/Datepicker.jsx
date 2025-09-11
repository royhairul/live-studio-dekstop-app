"use client";

import React from "react";
import { format } from "date-fns";
import { IconCalendar } from "@tabler/icons-react";
import { subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DatePicker({
  value,
  onChange,
  withRange = false,
  presets = [
    { label: "7 hari terakhir", value: "range:last-7-days" },
    { label: "15 hari terakhir", value: "range:last-15-days" },
    { label: "30 hari terakhir", value: "range:last-30-days" },
  ]
}) {
  const getLocalDate = () =>
    new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));

  const [internalDate, setInternalDate] = React.useState({
    from: getLocalDate() - 1 * 24 * 60 * 60 * 1000,
    to: getLocalDate() - 1 * 24 * 60 * 60 * 1000,
  });

  const selectedDate = value || internalDate;

  const handleChange = (newDate) => {
    if (newDate?.from && !newDate?.to) {
      newDate = {
        from: newDate.from,
        to: newDate.from,
      };
    }

    if (!value) {
      setInternalDate(newDate);
    }
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-secondary w-[240px] justify-start text-left font-normal text-white",
            !selectedDate && "text-white"
          )}
        >
          <IconCalendar className="mr-2 h-4 w-4" />
          {selectedDate?.from ? (
            selectedDate.to && withRange ? (
              <>
                {format(selectedDate.from, "LLL dd, y")} -{" "}
                {format(selectedDate.to, "LLL dd, y")}
              </>
            ) : (
              format(selectedDate.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        {presets.length > 0 && (
          <Select
            onValueChange={(value) => {
              const today = getLocalDate();

              if (value.startsWith("offset:")) {
                const offset = parseInt(value.split(":")[1]);
                const offsetDate = new Date(today.setDate(today.getDate() + offset));
                handleChange({ from: offsetDate, to: withRange ? offsetDate : undefined });
              }

              if (value === "range:last-7-days") {
                const start = subDays(today, 6); // termasuk hari ini
                handleChange({ from: start, to: today });
              }

              if (value === "range:last-15-days") {
                const start = subDays(today, 14);
                handleChange({ from: start, to: today });
              }

              if (value === "range:last-30-days") {
                const start = subDays(today, 29);
                handleChange({ from: start, to: today });
              }
            }}

          >
            <SelectTrigger className="bg-secondary text-white">
              <SelectValue placeholder="Shortcut" />
            </SelectTrigger>
            <SelectContent position="popper">
              {presets.map((preset, idx) => (
                <SelectItem key={idx} value={preset.value}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="rounded-md border">
          <Calendar
            initialFocus
            mode={withRange ? "range" : "single"}
            defaultMonth={selectedDate?.from}
            selected={selectedDate}
            onSelect={(date) => {
              if (withRange) {
                handleChange(date);
              } else {
                handleChange({ from: date });
              }
            }}
            numberOfMonths={withRange ? 2 : 1}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
