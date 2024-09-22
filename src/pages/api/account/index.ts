import { NextApiRequest, NextApiResponse } from "next";
import { getUserSession } from "@/lib/auth";
import account from "@/lib/query/account";
import { AccountType } from "@prisma/client";
const TypeSelector = (type: string) => {
  switch (type) {
    case "Person":
      return AccountType.PERSON;
    case "Cash":
      return AccountType.CASH;
    case "Bank":
      return AccountType.BANK;
  }
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }
  // @ts-ignore
  const userId = session?.user?.userId;
  console.log(session);
  if (req.method === "GET") {
    const result = await account.getAccountsByUser(userId);
    if (result) {
      return res.status(200).json({ status: 1, data: result });
    }
  } else if (req.method == "POST") {
    const body = req.body;
    const result = await account.add({
      ...body,
      type: TypeSelector(body.type),
      userId,
    });
    res
      .status(200)
      .json({ status: 1, message: "Account Added Succesfully", data: result });
  }

  //
  res.status(404).json({ status: 0 });
};

export default handler;
