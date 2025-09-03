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

const akunList = [
    { label: "Pedro Duarte", value: "pedro" },
    { label: "Maria Lopez", value: "maria" },
    { label: "John Smith", value: "john" },
    { label: "Sakura Tanaka", value: "sakura" },
];

export function SearchSelectAkun() {
    const [selectedAkun, setSelectedAkun] = useState(akunList[0]);
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            const query = inputRef.current?.value.toLowerCase();
            const match = akunList.find((akun) =>
                akun.label.toLowerCase().includes(query || "")
            );
            if (match) {
                setSelectedAkun(match);
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
                        {selectedAkun.label}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0 min-w-sm ">
                    <Command className={"bg-accent-foreground text-accent"}>
                        <CommandInput
                            ref={inputRef}
                            placeholder="Cari akun..."
                            onKeyDown={handleEnter}
                            autoFocus
                        />
                        <CommandList>
                            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                            {akunList.map((akun) => (
                                <CommandItem
                                    key={akun.value}
                                    onSelect={() => {
                                        setSelectedAkun(akun);
                                        setOpen(false);
                                    }}
                                >
                                    {akun.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}