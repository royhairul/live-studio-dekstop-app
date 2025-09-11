import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
import { MonthYearSelect } from "./mont-year-select";

export function DialogTambahData({
    title = "Tambah Data",
    fields = [],
    endpoint = null,
    queryInvalidateKey = [],
    selectOptions = {},
}) {
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    // handler input umum
    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // mutation
    const mutation = useMutation({
        mutationFn: async (values) => {
            const { data } = await axios.post(endpoint(), values);
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
                description: error?.response?.data?.message || "Terjadi kesalahan.",
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
                                        onChange={(val) =>
                                            setFormData((prev) => ({ ...prev, [field.name]: val }))
                                        }
                                    />
                                ) : (
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type || "text"}
                                        placeholder={field.placeholder || ""}
                                        className="border-accent"
                                        value={formData[field.name] || ""}
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
