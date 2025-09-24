import { parse } from "date-fns";
import { z } from "zod";

export const schema = z.object({
    studio_id: z.number({ message: "Studio harus diisi" }),
    date: z.string({ message: "Bulan dan Tahun harus diisi" }).refine((val) => {
        if (!val) return false;


        const inputDate = parse(val, "MMMM yyyy", new Date());
        const now = new Date();

        // Awal bulan ini
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Akhir tahun ini
        const endOfThisYear = new Date(now.getFullYear(), 11, 31);

        return inputDate >= startOfThisMonth && inputDate <= endOfThisYear;
    }, {
        message: "Tanggal hanya boleh dari bulan ini sampai Desember tahun ini"
    }),
    target_gmv: z.coerce.number({ message: "Target GMV harus diisi" }).min(1, { message: "Target GMV harus diisi" }),
    target_income: z.coerce.number({ message: "Target Pendapatan harus diisi" }).min(1, { message: "Target Pendapatan harus diisi" }),
});
