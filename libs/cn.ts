import clsx from "clsx";
import { twMerge, ClassNameValue } from "tailwind-merge";

export function cn(...inputs: ClassNameValue[]) {
    return twMerge(clsx(inputs))
}