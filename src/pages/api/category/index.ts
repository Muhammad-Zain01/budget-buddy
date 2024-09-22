import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import category from "@/lib/query/category";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }

  // @ts-ignore
  const userId = session?.user?.userId;
  if (req.method === "GET") {
    const result = await category.getCategoryByUser(userId);
    if (result) {
      return res.status(200).json({ status: 1, data: result });
    }
  }
  res.status(404).json({ status: 0 });
};

export default handler;
