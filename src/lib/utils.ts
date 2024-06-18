import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
