import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import category, { AddCategoryType } from "@/lib/query/category";
import { CategoryType } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  const { icon, categoryType, categoryName } = data;
  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }
  if (
    icon.trim() == "" ||
    categoryType.trim() == "" ||
    categoryName.trim() == ""
  ) {
    return res.status(400).json({ status: 0, message: "MISSING_FIELDS" });
  }

  // @ts-ignore
  const userId = session?.user?.userId;
  if (!userId) {
    return res.status(400).json({ status: 0, message: "UN_AUTHORIZED" });
  }
  const addCategoryData: AddCategoryType = {
    icon,
    categoryName,
    categoryType:
      categoryType == "expense" ? CategoryType.EXPENSE : CategoryType.INCOME,
    userId,
  };
  const result = await category.add(addCategoryData);
  if (result?.id) {
    res.status(200).json({ status: 1, data: result });
  }
  res.status(500).json({ status: 0 });
};

export default handler;
