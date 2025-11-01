import { z } from "zod";

export const checkinSchema = z.object({
  // host_ids: z.array(z.string()).min(1, { message: "Choose Host minimum 1." }),
  host_id: z.string().min(1, { message: "Shift is required." }),
  shift_id: z.string().min(1, { message: "Shift is required." }),
  studio_id: z.string().min(1, { message: "Shift is required." }),
  date: z.string().min(1, { message: "Date is required." }),
  attendance: z.enum(["checkIn", "checkOut"], {
    required_error: "Attendance is required.",
  }),
});
