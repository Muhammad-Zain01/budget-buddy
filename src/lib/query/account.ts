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
    return await prisma.account.findMany({
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
      },
    });
  },
};

export default account;
