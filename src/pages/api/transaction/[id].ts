import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import account from "@/lib/query/account";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }

  if (req.method === "DELETE" && id) {
    // const result = account.remove(Number(id));
    // if (result) {
    //   return res.status(200).json({ status: 1 });
    // }
    // res.status(500).json({ status: 0 });
  } else if (req.method === "PUT" && id) {
    // const data = req.body;
    // const result = account.update(data, Number(id));
    // if (result) {
    //   return res.status(200).json({ status: 1 });
    // }
    // res.status(500).json({ status: 0 });
  }

  res.status(404).json({ status: 0 });
};

export default handler;
