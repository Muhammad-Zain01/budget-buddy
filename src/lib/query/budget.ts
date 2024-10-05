import prisma from "@/lib/db";
import { getMonthDateRange } from "../utils";

export type AddBudget = {
  name: string;
  amount: number;
  categoryId: number;
  userId: number;
};

const budget = {
  get: async (id: number) => {
    return await prisma.budget.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        amount: true,
        category: true,
      },
    });
  },
  add: async (data: AddBudget) => {
    return await prisma.budget.create({
      data: data,
    });
  },
  remove: async (id: number) => {
    return await prisma.budget.delete({
      where: {
        id,
      },
    });
  },
  update: async (data: Partial<AddBudget>, id: number) => {
    return await prisma.budget.update({
      where: {
        id,
      },
      data: data,
    });
  },
  getBudgetsByUser: async (userId: number, month: number, year: number) => {
    const { startDate, endDate } = getMonthDateRange(year, month);

    const budgets = await prisma.budget.findMany({
      where: {
        userId: userId,
        OR: [
          { isRecurring: true },
          {
            AND: [
              { isRecurring: false },
              {
                createdAt: {
                  gte: new Date(startDate || 0),
                  lte: new Date(endDate || 0),
                },
              },
            ],
          },
        ],
      },
      include: {
        category: true,
      },
    });

    const result = await Promise.all(
      budgets.map(async (budget) => {
        const transactions = await prisma.transaction.findMany({
          where: {
            userId: userId,
            categoryId: budget.categoryId,
            type: "EXPENSE",
            createdAt: {
              gte: new Date(startDate || 0),
              lte: new Date(endDate || 0),
            },
          },
        });

        const totalExpense = transactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        );

        return {
          ...budget,
          totalExpense,
        };
      })
    );

    return result;
  },
};

export default budget;
