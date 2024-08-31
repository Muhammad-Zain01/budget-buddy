import { Account } from "./Account";
import { Category } from "./Category";

export type Transaction = {
  id: number;
  balance: string;
  amount?: string;
  type: "income" | "expense" | "transfer" | "people";
  description?: string;
  account: number | Account;
  category: number | Category;
  from: number;
  to: number;
  date: string;
  status: boolean;
};
