import { NextApiRequest, NextApiResponse } from "next";
import dbUser from "@/lib/query/user";
import { getUserSession } from "@/lib/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ status: 0, message: "Method Not Allowed" });
  }

  const session = await getUserSession(req, res);
  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }
  
  const verificationCode = req?.body?.code;
  // @ts-ignore
  const userId = session?.user?.userId;

  if (!verificationCode) {
    return res
      .status(400)
      .json({ status: 0, message: "Verification Code is Required" });
  }

  try {
    const user = await dbUser.getUserFromUserId(parseInt(userId));

    if (!user) {
      return res.status(404).json({ status: 0, message: "User not found" });
    }

    if (user.isVerfied) {
      return res
        .status(400)
        .json({ status: 0, message: "User already verified" });
    }

    const isCodeValid = verificationCode === user.verificationCode;

    if (!isCodeValid) {
      return res
        .status(400)
        .json({ status: 0, message: "Invalid verification code" });
    }

    await dbUser.verifyUser(userId);

    return res
      .status(200)
      .json({ status: 1, message: "User verified successfully" });
  } catch (error) {
    console.error("Verification error:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Internal server error" });
  }
};

export default handler;
