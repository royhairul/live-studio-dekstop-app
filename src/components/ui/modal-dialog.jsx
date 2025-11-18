import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchSelect } from "./search-select";
import { formatDateTarget } from "@/helpers/formatDate";
import { MonthYearSelect } from "../month-year-select";
import CurrencyInput from "../Input-number";
import { DatePicker } from "../date-input";
import { apiSecure } from "@/lib/useApi";

export function DialogTambahData({
    title,
    fields = [],
    endpoint = null,
    queryInvalidateKey = [],
    selectOptions = {},
    schema = null,
}) {
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false);    
    const queryClient = useQueryClient();

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const mutation = useMutation({
        mutationFn: async (values) => {
            const { data } = await apiSecure.post(endpoint(), values);
            return data;
        },
        onSuccess: (result) => {
            toast.success(result?.message || "Data berhasil ditambahkan.");
            if (queryInvalidateKey.length > 0) {
                queryClient.invalidateQueries({ queryKey: queryInvalidateKey });
            }
            setOpen(false);
            setFormData({});
        },
        onError: (error) => {
            console.error("error:", error);
            toast.error("Gagal menambahkan data.", {
                description: error?.response?.data?.error || "Terjadi kesalahan.",

            });
        },
    });

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = {};
        fields.forEach((field) => {
            const val = formData[field.name];

            switch (field.type) {
                case "number":
                    finalData[field.name] = Number(val);
                    break;
                case "month":
                    finalData[field.name] = formatDateTarget(val);
                    break;
                default:
                    finalData[field.name] = val;
            }
        });

        console.log("data", finalData);
        
        const result = schema.safeParse(finalData);
        if (!result.success) {
            result.error.errors.forEach((err) => {
                toast.error("Validasi gagal", {
                    description: err.message,
                });
            });
            return;
        }

        mutation.mutate(finalData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>{title}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-3">
                        {fields.map((field, i) => (
                            <div key={i} className="grid gap-3">
                                <Label htmlFor={field.name}>{field.label}</Label>
                                {field.type === "select" ? (
                                    <SearchSelect
                                        options={selectOptions[field.name] || []}
                                        placeholder={`Pilih ${field.label}...`}
                                        onChange={(val) => handleChange(field.name, val?.value)}
                                    />
                                ) : field.type === "monthyear" ? (
                                    <MonthYearSelect
                                        value={formData[field.name]}
                                        withDefault={false}
                                        onChange={(val) =>
                                            setFormData((prev) => ({ ...prev, [field.name]: val }))
                                        }
                                    />
                                ) : field.type === "number" ? (
                                    <CurrencyInput
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={(val) => handleChange(field.name, val)}
                                        placeholder="Masukkan angka"
                                    />

                                ) : field.type === "date" ? (
                                    <DatePicker
                                        value={formData[field.name]}
                                        onChange={(val) => handleChange(field.name, val)}
                                    />
                                ) : (
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type || "text"}
                                        placeholder={field.placeholder || ""}
                                        className="border-accent"
                                        value={formData[field.name] || ""}
                                        min={field.type === "number" ? 0 : undefined}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" className="bg-red-600 text-white">
                                Batal
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
