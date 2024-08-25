export type Transaction = {
  id: number;
  balance: string;
  type: "income" | "expense" | "transfer" | "people";
  account: number;
  category: number;
  from: number;
  to: number;
  date: string;
  status: boolean;
};
