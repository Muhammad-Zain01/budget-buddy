export type CategoryType = "expense" | "income";

export type Category = {
  id: number;
  isPrimary: boolean;
  categoryName: string;
  categoryType: CategoryType;
  icon: string;
  status: boolean;
};
