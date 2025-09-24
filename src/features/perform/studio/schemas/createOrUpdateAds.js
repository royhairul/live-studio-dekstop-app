import { z } from "zod";

export const schema = z.object({
    accountid: z.number({ message: "Akun harus diisi" }),
    ads: z.number({ message: "Iklan harus diisi" }),
    date: z.string({ message: "Tanggal Iklan harus diisi" })
});
