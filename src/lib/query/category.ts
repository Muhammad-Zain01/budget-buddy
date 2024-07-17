import prisma from "@/lib/db";
import { CategoryType } from "@prisma/client";

export type AddCategoryType = {
  icon: string;
  categoryName: string;
  categoryType: CategoryType;
  userId: number;
};

type CategoryData = {
  categoryName: string;
  categoryType: string;
  icon: string;
};

const category = {
  add: async (data: AddCategoryType) => {
    return await prisma.category.create({
      data,
      select: {
        id: true,
        isPrimary: true,
        categoryName: true,
        categoryType: true,
        icon: true,
        status: true,
      },
    });
  },
  remove: async (id: number) => {
    return await prisma.category.delete({
      where: {
        id,
      },
    });
  },
  update: async (data: CategoryData, id: number) => {
    return await prisma.category.update({
      where: {
        id,
      },
      data: {
        categoryName: data.categoryName,
        categoryType:
          data.categoryType == "expense"
            ? CategoryType.EXPENSE
            : CategoryType.INCOME,
        icon: data.icon,
      },
    });
  },
  getCategoryByUser: async (userId: number) => {
    return await prisma.category.findMany({
      where: {
        OR: [{ isPrimary: true }, { userId: userId }],
      },
      select: {
        id: true,
        isPrimary: true,
        categoryName: true,
        categoryType: true,
        icon: true,
        status: true,
      },
    });
  },
};

export default category;
