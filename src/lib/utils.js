import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const formatDate = (date) => date ? format(date, "yyyy-MM-dd") : null;

