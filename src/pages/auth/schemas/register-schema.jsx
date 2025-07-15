import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().min(1, { message: "Email is required." }).email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
});
