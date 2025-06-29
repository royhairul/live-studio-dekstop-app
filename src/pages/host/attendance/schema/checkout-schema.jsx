import { z } from "zod";

export const checkoutSchema = z.object({
  attendance_ids: z
    .array(z.number())
    .min(1, { message: "Choose Attendance minimum 1." }),
});
