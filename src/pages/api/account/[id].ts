import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import account from "@/lib/query/account";
import errors from "@/lib/error";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: errors.UN_AUTHORIZED });
  }

  if (req.method === "DELETE" && id) {
    const acc = await account.get(Number(id));
    if (acc?.fromTransactions.length || acc?.toTransactions.length) {
      return res
        .status(400)
        .json({ status: 0, message: errors.DELETE_NOT_POSSBILE });
    }
    const result = await account.remove(Number(id));
    if (result) {
      return res.status(200).json({ status: 1 });
    }
    res.status(500).json({ status: 0 });
  } else if (req.method === "PUT" && id) {
    const data = req.body;
    const result = await account.update(data, Number(id));
    if (result) {
      return res.status(200).json({ status: 1 });
    }
    res.status(500).json({ status: 0 });
  }

  res.status(404).json({ status: 0 });
};

export default handler;
