import { z } from "zod";

export const schema = z.object({
    studio_id: z.number({message: "Studio harus diisi"}),
    date: z.string({message: "Bulan dan Tahun harus diisi"}),
    target_gmv: z.coerce.number({message: "Target GMV harus diisi"}).min(1, { message: "Target GMV harus diisi" }),
    target_income: z.coerce.number({message: "Target Pendapatan harus diisi"}).min(1, { message: "Target Pendapatan harus diisi" }),
});
