import { AccountType } from "@prisma/client";

export type Account = {
  id: number;
  balance: string;
  name: string;
  type: AccountType;
  status: boolean;
  initialBalance?: number;
};
