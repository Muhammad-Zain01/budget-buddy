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

export const capitalize = (text: string) => {
  if (typeof text !== "string" || text.length === 0) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getIcon = (type: string) => {
  switch (type) {
    case "cash":
      return "money";
    case "bank":
      return "bank";
    case "person":
      return "user";
  }
};
