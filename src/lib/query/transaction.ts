import prisma from "@/lib/db";
import { Transaction } from "@prisma/client";
import { skip } from "node:test";
import { getMonthDateRange } from "../utils";

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

        // Other fields
        category: data?.categoryId
          ? { connect: { id: data.categoryId } }
          : undefined,

        subType: data?.subType,
      },
    });
  },
  getTransactionByUser: async (
    userId: number,
    selectedMonth: number | undefined,
    selectedYear: number | undefined,
    page: number,
    pageSize = 12
  ) => {
    const { startDate, endDate } = getMonthDateRange(
      selectedYear,
      selectedMonth
    );

    const skip = (page - 1) * pageSize;
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        ...(selectedMonth !== undefined &&
          selectedYear !== undefined &&
          startDate !== null &&
          endDate !== null && {
            createdAt: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          }),
      },
      select: {
        id: true,
        type: true,
        description: true,
        tags: true,
        amount: true,
        createdAt: true,
        categoryId: true,
        userId: true,
        category: true,
        addedBy: true,
        subType: true,
        fromAccount: true,
        fromId: true,
        toAccount: true,
        toId: true,
      },
      skip: skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await prisma.transaction.count({
      where: {
        userId: userId,
        ...(selectedMonth !== undefined &&
          selectedYear !== undefined && {
            createdAt: {
              gte: new Date(selectedYear, selectedMonth, 1),
              lt: new Date(selectedYear, selectedMonth + 1, 1),
            },
          }),
      },
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      transactions,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  },
};

export default transaction;
