import { Account } from "./Account";
import { Category } from "./Category";

type SubType = "pay" | "receive" | "lend" | "borrow";

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
  fromAccount?: Account;
  toAccount?: Account;
  subType?: SubType;
  createdAt?: string;
  date: string;
  tags?: string;
  status: boolean;
};
