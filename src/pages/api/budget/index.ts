import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import budget from "@/lib/query/budget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }
  // @ts-ignore
  const userId = session?.user?.userId;

  const { month, year } = req.query;

  const selectedMonth = month
    ? parseInt(month as string)
    : new Date().getMonth();
  const selectedYear = year
    ? parseInt(year as string)
    : new Date().getFullYear();

  if (req.method === "GET") {
    const result = await budget.getBudgetsByUser(
      userId,
      selectedMonth,
      selectedYear
    );
    if (result) {
      return res.status(200).json({ status: 1, data: result });
    }
  } else if (req.method == "POST") {
    const body = req.body;
    const payload = {
      ...(body || {}),
      amount: Number(body?.amount),
      categoryId: Number(body?.categoryId),
      userId: userId,
    };
    const result = await budget.add(payload);

    res.status(200).json({
      status: 1,
      message: "Budget Added Succesfully",
      data: result,
    });
  }
  res.status(404).json({ status: 0 });
};

export default handler;
