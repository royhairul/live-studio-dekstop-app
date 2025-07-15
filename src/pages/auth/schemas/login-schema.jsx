import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }).email(),
  password: z.string().min(4, { message: "Password at least 6 character" }),
  rememberMe: z.boolean().optional(),
});
