import { useState, useRef } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
    CommandEmpty,
} from "@/components/ui/command";

export function SearchSelect({ options, placeholder = "Cari...", onChange }) {
    const [selected, setSelected] = useState(options[0] || null);
    const [open, setOpen] = useState(false);
    const inputRef = useRef (null);

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            const query = inputRef.current?.value.toLowerCase();
            const match = options.find((opt) =>
                opt.label.toLowerCase().includes(query || "")
            );
            if (match) {
                setSelected(match);
                onChange?.(match);
                setOpen(false);
            }
        }
    };

    return (
        <div className="grid gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        className="w-full justify-between bg-accent-foreground text-accent hover:bg-accent-foreground border-1"
                        onClick={() => setOpen(true)}
                    >
                        {selected ? selected.label : "Pilih"}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0 min-w-sm ">
                    <Command className={"bg-accent-foreground text-accent"}>
                        <CommandInput
                            ref={inputRef}
                            placeholder={placeholder}
                            onKeyDown={handleEnter}
                            autoFocus
                        />
                        <CommandList>
                            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    onSelect={() => {
                                        setSelected(opt);
                                        onChange?.(opt);
                                        setOpen(false);
                                    }}
                                >
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
