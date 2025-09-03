import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchSelectAkun } from "./search-select"
import { DatePicker } from "../Datepicker"

export function DialogTambahData({ title = "Tambah Data", fields = [] }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="relative overflow-hidden px-4 py-2 bg-primary text-white font-semibold rounded-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-accent hover:shadow-lg hover:ring-2 hover:ring-primary">
                        <span className="relative z-10">{title}</span>
                        <span className="absolute inset-0 bg-white opacity-10 blur-sm transition-all duration-500 hover:opacity-20"></span>
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        {fields.map((field, i) => (
                            <div key={i} className="grid gap-3">
                                <Label htmlFor={field.name}>{field.label}</Label>
                                {field.type === "select" ? (
                                    <SearchSelectAkun />
                                ) : field.type === "date" ? (
                                    <DatePicker />
                                ) : field.type === "month" ? (
                                    <input
                                        type="month"
                                        id={field.name}
                                        name={field.name}
                                        className="w-full border rounded-lg px-3 py-2 border-accent"
                                    />
                                ) : (
                                    <Input
                                        className="border-accent"
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeholder || ""}
                                        type={field.type || "text"}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="relative overflow-hidden px-4 py-2 bg-red-600 text-white font-semibold rounded-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-accent hover:shadow-lg hover:ring-2 hover:ring-primary">
                                <span className="relative z-10">Batal</span>
                                <span className="absolute inset-0 bg-white opacity-10 blur-sm transition-all duration-500 hover:opacity-20"></span>
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="relative overflow-hidden px-4 py-2 bg-primary text-white font-semibold rounded-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-accent hover:shadow-lg hover:ring-2 hover:ring-primary"
                        >
                            <span className="relative z-10">Simpan</span>
                            <span className="absolute inset-0 bg-white opacity-10 blur-sm transition-all duration-500 hover:opacity-20"></span>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
