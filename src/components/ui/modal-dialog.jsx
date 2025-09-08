import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner"; 
import { useNavigate } from "react-router-dom"; 

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
import { DatePicker } from "../Datepicker";
import { useAccounts } from "@/hooks/account/useAccounts";
import { apiEndpoints } from "@/config/api";

export function DialogTambahData({ title = "Tambah Data", fields = [] }) {
    const { data: akunList = [] } = useAccounts();
    const akunOptions = akunList.map((item) => ({
        value: item.id,
        label: `${item.name} (${item.platform})`,
    }));

    const [formData, setFormData] = useState({});
    const [selectedAkun, setSelectedAkun] = useState(null);
    const [open, setOpen] = useState(false);


    const queryClient = useQueryClient();

    // Untuk input text / month
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Mutation
    const createAccountMutation = useMutation({
        mutationFn: async (values) => {
            const { status, result } = await axios.post(
                apiEndpoints.ads.create(),
                values
            );
            if (!status) {
                throw new Error(result.errors || "Gagal menambahkan akun.");
            }

            return result;

        },
        onSuccess: (result) => {
            toast.success(result?.message || "Data berhasil ditambahkan.");
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            setOpen(false); 
        },
        onError: (error) => {
            console.error("error:", error);
            toast.error("Gagal membuat account.", {
                description: error?.response?.data?.message || "Invalid or expired cookies.",
            });
        },
    });

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = {
            accountid: selectedAkun?.value,
            date: formData.date,   // sudah ada string YYYY-MM-DD
            iklan: formData.iklan, // contoh field lain
        };


        console.log("Form submitted:", finalData);


        createAccountMutation.mutate(finalData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    {title}
                </Button>
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
                                        options={akunOptions}
                                        placeholder="Cari Akun..."
                                        onChange={(val) => setSelectedAkun(val)}
                                    />
                                ) : field.type === "date" ? (
                                    <input
                                        type="date"
                                        value={formData.date || ""}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, date: e.target.value }))
                                        }
                                    />


                                ) : field.type === "month" ? (
                                    <input
                                        type="month"
                                        id={field.name}
                                        name={field.name}
                                        className="w-full border rounded-lg px-3 py-2 border-accent"
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Input
                                        className="border-accent"
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeholder || ""}
                                        type={field.type || "text"}
                                        onChange={handleChange}
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
                        <Button type="submit" disabled={createAccountMutation.isPending}>
                            {createAccountMutation.isPending ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    );
}
