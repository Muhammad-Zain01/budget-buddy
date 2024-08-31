import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import transaction from "@/lib/query/transaction";
import { TagsConverter, TypeSelector } from ".";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }

  if (req.method === "DELETE" && id) {
    const result = await transaction.remove(Number(id));
    if (result) {
      return res.status(200).json({ status: 1 });
    }
    res.status(500).json({ status: 0 });
  } else if (req.method === "PUT" && id) {
    const data = req.body;
    const payload = {
      type: TypeSelector(data?.type),
      createdAt: data?.date,
      balance: Number(data?.balance),
      tags: TagsConverter(data?.tags),
      description: data?.description,
      categoryId: Number(data?.category) || null,
      accountId: Number(data?.account) || null,
      subType: data?.subType,
      fromAccount: data?.fromAccount,
      fromId: Number(data?.from) || null,
      toAccount: Number(data?.toAccount) || null,
      toId: Number(data?.to) || null,
    };
    const result = await transaction.update(payload, Number(id));
    if (result) {
      return res.status(200).json({ status: 1 });
    }
    res.status(500).json({ status: 0 });
  }

  res.status(404).json({ status: 0 });
};

export default handler;
