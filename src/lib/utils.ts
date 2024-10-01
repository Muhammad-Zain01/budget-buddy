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
    case "transfer":
      return "transfer";
  }
};

export const isValidJSON = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const getMonthDateRange = (
  year: number | undefined,
  month: number | undefined
) => {
  if (!year || !month) return { startDate: null, endDate: null };

  const jsMonth = month - 1;
  const startDate = new Date(year, jsMonth, 1);
  const lastDay = new Date(year, jsMonth + 1, 0).getDate();
  const endDate = new Date(year, jsMonth, lastDay);
  const formatDate = (date: any) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
};


export const generateVerificationCode = (): string => {
  const codeLength = 6;
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
