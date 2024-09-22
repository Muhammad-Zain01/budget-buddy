import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import transaction from "@/lib/query/transaction";
import { Transaction, TransactionType } from "@prisma/client";

export const TypeSelector = (type: string) => {
  const types = {
    expense: TransactionType.EXPENSE,
    income: TransactionType.INCOME,
    transfer: TransactionType.TRANSFER,
    people: TransactionType.PEOPLE,
  };
  // @ts-ignore
  return types[type];
};

export const TagsConverter = (tags: string[] | null) => {
  if (tags && Array.isArray(tags)) {
    return JSON.stringify(tags);
  }
  return "";
};

const generateTransactionBody = (body: any, userId: number) => {
  return {
    type: TypeSelector(body?.type),
    tags: TagsConverter(body?.tags),
    subType: body?.subType || null,
    description: body?.description || "",
    amount: Number(body?.balance || 0),
    categoryId: body?.category || null,
    fromId: body?.from || null,
    toId: body?.to || null,
    userId,
  };
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession(req, res);
  const { month, year, page } = req.query;
  const selectedMonth = month
    ? parseInt(month as string)
    : new Date().getMonth();
  const selectedYear = year
    ? parseInt(year as string)
    : new Date().getFullYear();

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }

  // @ts-ignore
  const userId = session?.user?.userId;

  if (req.method === "GET") {
    const result = await transaction.getTransactionByUser(
      userId,
      selectedMonth,
      selectedYear,
      Number(page) || 0
    );
    if (result) {
      return res.status(200).json({ status: 1, data: result });
    }
  } else if (req.method == "POST") {
    const body = req.body;
    const data = generateTransactionBody(body, userId);
    const result = await transaction.add(data as Transaction);
    res.status(200).json({
      status: 1,
      message: "Transaction Added Succesfully",
      data: result,
    });
  }

  res.status(404).json({ status: 0 });
};

export default handler;
