import prisma from "@/lib/db";
import { AccountType } from "@prisma/client";

export type AddAccount = {
  name: string;
  type: AccountType;
  balance: number;
};

const account = {
  get: async (id: number) => {
    return await prisma.account.findUnique({
      where: { id: id },
      select: {
        id: true,
        type: true,
        name: true,
        fromTransactions: true,
        toTransactions: true,
      },
    });
  },
  add: async (data: AddAccount) => {
    return await prisma.account.create({
      // @ts-ignore
      data: data,
    });
  },
  remove: async (id: number) => {
    return await prisma.account.delete({
      where: {
        id,
      },
    });
  },
  update: async (data: AddAccount, id: number) => {
    return await prisma.account.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        balance: data.balance,
      },
    });
  },
  getAccountsByUser: async (userId: number) => {
    const accountsWithUpdatedBalance = await prisma.account.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        balance: true,
        createdAt: true,
        status: true,
        fromTransactions: {
          select: {
            amount: true,
            type: true,
            fromId: true,
            subType: true,
            toId: true,
          },
        },
        toTransactions: {
          select: {
            amount: true,
            subType: true,
            type: true,
            fromId: true,
            toId: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const updatedAccounts = accountsWithUpdatedBalance.map((account) => {
      const initialBalance = account.balance;
      let updatedBalance = initialBalance;

      const debits = account.fromTransactions.reduce((total, transaction) => {
        if (
          transaction.type === "EXPENSE" ||
          transaction.type === "TRANSFER" ||
          transaction.type === "PEOPLE"
        ) {
          return total + transaction.amount;
        }
        return total;
      }, 0);

      const credits = account.toTransactions.reduce((total, transaction) => {
        if (
          transaction.type === "INCOME" ||
          transaction.type === "TRANSFER" ||
          transaction.type === "PEOPLE"
        ) {
          return total + transaction.amount;
        }
        return total;
      }, 0);

      updatedBalance = updatedBalance - debits + credits;

      return {
        id: account.id,
        name: account.name,
        type: account.type,
        initialBalance: initialBalance,
        balance: updatedBalance,
        createdAt: account.createdAt,
        status: account.status,
      };
    });

    return updatedAccounts;
  },
  getDashboardDataByUser: async (
    userId: number,
    selectedMonth: number,
    selectedYear: number
  ) => {
    const startDate = new Date(selectedYear, selectedMonth, 1);
    const endDate = new Date(selectedYear, selectedMonth + 1, 0);

    const accountsWithTransactions = await prisma.account.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        balance: true,
        createdAt: true,
        status: true,
        fromTransactions: {
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          select: {
            amount: true,
            type: true,
            subType: true,
            categoryId: true,
            category: true,
            createdAt: true,
          },
        },
        toTransactions: {
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          select: {
            amount: true,
            type: true,
            subType: true,
            categoryId: true,
            category: true,
            createdAt: true,
          },
        },
      },
    });

    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpense = 0;
    const spendingBreakdown: Record<string, number> = {};
    const incomeBreakdown: Record<string, number> = {};
    const incomeVsExpense = { income: 0, expense: 0 };
    const incomeByDate: Record<string, number> = {};
    const expenseByDate: Record<string, number> = {};

    accountsWithTransactions.forEach((account) => {
      let accountBalance = account.balance;

      account.fromTransactions.forEach((transaction) => {
        const dateKey = transaction.createdAt.toISOString().split("T")[0];
        if (transaction.type === "EXPENSE") {
          totalExpense += transaction.amount;
          accountBalance -= transaction.amount;
          incomeVsExpense.expense += transaction.amount;

          const categoryName =
            transaction.category?.categoryName || "Uncategorized";
          spendingBreakdown[categoryName] =
            (spendingBreakdown[categoryName] || 0) + transaction.amount;

          expenseByDate[dateKey] =
            (expenseByDate[dateKey] || 0) + transaction.amount;
        } else if (
          transaction.type === "TRANSFER" ||
          transaction.type === "PEOPLE"
        ) {
          accountBalance -= transaction.amount;
        }
      });

      account.toTransactions.forEach((transaction) => {
        const dateKey = transaction.createdAt.toISOString().split("T")[0];
        if (transaction.type === "INCOME") {
          totalIncome += transaction.amount;
          accountBalance += transaction.amount;
          incomeVsExpense.income += transaction.amount;

          const categoryName =
            transaction.category?.categoryName || "Uncategorized";
          incomeBreakdown[categoryName] =
            (incomeBreakdown[categoryName] || 0) + transaction.amount;

          incomeByDate[dateKey] =
            (incomeByDate[dateKey] || 0) + transaction.amount;
        } else if (
          transaction.type === "TRANSFER" ||
          transaction.type === "PEOPLE"
        ) {
          accountBalance += transaction.amount;
        }
      });

      totalBalance += accountBalance;
    });

    const dashboardData = {
      currentAmount: totalBalance,
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      spendingBreakdown: spendingBreakdown,
      incomeBreakdown: incomeBreakdown,
      incomeVsExpense: incomeVsExpense,
      incomeByDate: incomeByDate,
      expenseByDate: expenseByDate,
    };

    return dashboardData;
  },
};

export default account;
