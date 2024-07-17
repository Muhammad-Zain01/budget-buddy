import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstLetterOfName = (name: string) => {
  if (name) {
    return name
      .split(" ")
      .map((item) => item[0].toUpperCase())
      .join("");
  }
};
