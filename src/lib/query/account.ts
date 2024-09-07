import prisma from "@/lib/db";
import { AccountType } from "@prisma/client";

export type AddAccount = {
  name: string;
  type: AccountType;
  balance: number;
};

const account = {
  add: async (data: AddAccount) => {
    return await prisma.account.create({
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
    });
    const updatedAccounts = accountsWithUpdatedBalance.map((account) => {
      let updatedBalance = account.balance;

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
        balance: updatedBalance,
        createdAt: account.createdAt,
        status: account.status,
      };
    });

    return updatedAccounts;
  },
  getDashboardDataByUser: async (userId: number) => {
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
          select: {
            amount: true,
            type: true,
            subType: true,
            categoryId: true,
          },
        },
        toTransactions: {
          select: {
            amount: true,
            type: true,
            subType: true,
            categoryId: true,
          },
        },
      },
    });
    
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpense = 0;
    const spendingBreakdown = {};
    const incomeVsExpense = { income: 0, expense: 0 };

    accountsWithTransactions.forEach((account) => {
      let accountBalance = account.balance;

      account.fromTransactions.forEach((transaction) => {
        if (transaction.type === "EXPENSE") {
          totalExpense += transaction.amount;
          accountBalance -= transaction.amount;
          incomeVsExpense.expense += transaction.amount;
          spendingBreakdown[transaction.categoryId] = (spendingBreakdown[transaction.categoryId] || 0) + transaction.amount;
        } else if (transaction.type === "TRANSFER" || transaction.type === "PEOPLE") {
          accountBalance -= transaction.amount;
        }
      });

      account.toTransactions.forEach((transaction) => {
        if (transaction.type === "INCOME") {
          totalIncome += transaction.amount;
          accountBalance += transaction.amount;
          incomeVsExpense.income += transaction.amount;
        } else if (transaction.type === "TRANSFER" || transaction.type === "PEOPLE") {
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
      incomeVsExpense: incomeVsExpense,
    };

    return dashboardData;
  },
};

export default account;
