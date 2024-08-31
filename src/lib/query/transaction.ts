import prisma from "@/lib/db";
import { Transaction } from "@prisma/client";

const transaction = {
  add: async (data: Transaction) => {
    return await prisma.transaction.create({
      data: data,
      include: {
        addedBy: true,
      },
    });
  },
  remove: async (id: number) => {
    return await prisma.transaction.delete({
      where: {
        id,
      },
    });
  },
  update: async (data: any, id: number) => {
    return await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        amount: data?.balance,
        type: data?.type,
        createdAt: data?.createdAt,
        tags: data?.tags,
        description: data?.description,
        fromAccount: data?.fromId
          ? { connect: { id: data.fromId } }
          : undefined,
        toAccount: data?.toId ? { connect: { id: data.toId } } : undefined,
        // Other fields
        category: data?.categoryId
          ? { connect: { id: data.categoryId } }
          : undefined,
        account: data?.accountId
          ? { connect: { id: data.accountId } }
          : undefined,

        subType: data?.subType,
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
        subType: true,
        fromAccount: true,
        fromId: true,
        toAccount: true,
        toId: true,
      },
    });
  },
};

export default transaction;
