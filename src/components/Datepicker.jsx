"use client";

import React from "react";
import { format } from "date-fns";
import { IconCalendar } from "@tabler/icons-react";

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
    { label: "Today", offset: 0 },
    { label: "Yesterday", offset: -1 },
    { label: "2 Days Ago", offset: -2 },
    { label: "A Week Ago", offset: -7 },
  ],
}) {
  const getLocalDate = () =>
    new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));

  const [internalDate, setInternalDate] = React.useState({
    from: getLocalDate(),
    to: getLocalDate(),
  });

  const selectedDate = value || internalDate;

  const handleChange = (newDate) => {
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
              const offset = parseInt(value);
              const baseDate = getLocalDate();
              const date = new Date(
                baseDate.setDate(baseDate.getDate() + offset)
              );

              handleChange({ from: date, to: withRange ? date : undefined });
            }}
          >
            <SelectTrigger className="bg-secondary text-white">
              <SelectValue placeholder="Shortcut" />
            </SelectTrigger>
            <SelectContent position="popper">
              {presets.map((preset, idx) => (
                <SelectItem key={idx} value={preset.offset.toString()}>
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
