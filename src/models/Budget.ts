import { Category } from "./Category";

export type Budget = {
  id: number;
  name: string;
  amount: number;
  isRecurring: boolean;
  createdAt: Date;
  userId: number;
  categoryId: number;
  category: Category;
  totalExpense?: number;
};
