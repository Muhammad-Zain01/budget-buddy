import prisma from "@/lib/db";
import { Transaction } from "@prisma/client";

const transaction = {
  add: async (data: Transaction) => {
    return await prisma.transaction.create({
      data: data,
    });
  },
  remove: async (id: number) => {
    return await prisma.transaction.delete({
      where: {
        id,
      },
    });
  },
  getTransactionByUser: async (userId: number) => {
    return await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        type: true,
        description: true,
        tags: true,
        amount: true,
        createdAt: true,
        categoryId: true,
        accountId: true,
        userId: true,
        category: true,
        account: true,
        addedBy: true,
      },
    });
  },
};

export default transaction;
