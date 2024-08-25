import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import transaction from "@/lib/query/transaction";
import { TransactionType } from "@prisma/client";

const TypeSelector = (type: string) => {
  const types = {
    expense: TransactionType.EXPENSE,
    income: TransactionType.INCOME,
    transfer: TransactionType.TRANSFER,
    people: TransactionType.PEOPLE,
  };
  return types[type];
};

const TagsConverter = (tags: string[] | null) => {
  if (tags && Array.isArray(tags)) {
    return JSON.stringify(tags);
  }
  return "";
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }

  const userId = session?.user?.userId;

  if (req.method === "GET") {
    const result = await transaction.getTransactionByUser(userId);
    if (result) {
      return res.status(200).json({ status: 1, data: result });
    }
  } else if (req.method == "POST") {
    const body = req.body;
    const data = {
      ...body,
      type: TypeSelector(body.type),
      tags: TagsConverter(body.tags),
    };
    
    console.log("bod >>", data);
    // const result = await transaction.add({
    //   ...body,
    //   type: TypeSelector(body.type),
    //   userId,
    // });
    // res
    //   .status(200)
    //   .json({ status: 1, message: "Account Added Succesfully", data: result });
  }

  //
  res.status(404).json({ status: 0 });
};

export default handler;
