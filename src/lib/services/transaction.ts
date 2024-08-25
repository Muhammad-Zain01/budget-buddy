import request from "../request";

type TransactionInput = {
  balance: string;
  date: string;
  tags?: string[] | null;
  description: string;
  category?: number;
  account?: number;
  from?: number;
  to?: number;
  type: "income" | "expense" | "transfer" | "people";
  subType?: string;
};

export const Transaction = {
  add: async (data: TransactionInput) => {
    console.log("sdf");
    const res = await request("/api/transaction", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },
  update: async (data: any) => {
    console.log("xx");
  },
};
