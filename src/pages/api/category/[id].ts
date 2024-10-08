import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import category from "@/lib/query/category";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getUserSession(req, res);
  const data = req.body;

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }

  if (req.method === "DELETE" && id) {
    const data = await category.get(Number(id));
    if (data?.Transaction.length) {
      return res.status(400).json({
        status: 0,
        message: "Cannot delete category with associated transactions",
      });
    }
    const result = await category.remove(Number(id));
    if (result) {
      return res.status(200).json({ status: 1 });
    }
    res.status(500).json({ status: 0 });
  } else if (req.method === "PUT" && id) {
    const result = await category.update(data, Number(id));
    if (result) {
      return res.status(200).json({ status: 1 });
    }
    res.status(500).json({ status: 0 });
  }

  res.status(404).json({ status: 0 });
};

export default handler;
