import { PrimaryCategories } from "./categories";
import { CategoryType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  for (let category of PrimaryCategories) {
    await prisma.category.create({
      data: {
        isPrimary: true,
        categoryName: category.title,
        categoryType:
          category.type == "expense"
            ? CategoryType.EXPENSE
            : CategoryType.INCOME,
        icon: category.icon,
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
