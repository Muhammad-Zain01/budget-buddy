import { NextApiRequest, NextApiResponse } from "next";
import dbUser from "@/lib/query/user";
import { getUserSession } from "@/lib/auth";
import { generateVerificationCode } from "@/lib/utils";
import email from "@/lib/email-api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ status: 0, message: "Method Not Allowed" });
  }

  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: "UN_AUTHORIZED" });
  }
  // @ts-ignore
  const userId = session?.user?.userId;

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

    const newVerificationCode = generateVerificationCode();

    await dbUser.updateCode(userId, newVerificationCode);
    await email.send("verification", {
      to: user.email,
      name: user.name,
      code: newVerificationCode,
    });

    return res.status(200).json({
      status: 1,
      message: "New verification code generated and sent successfully",
    });
  } catch (error) {
    console.error("Resend verification code error:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Internal server error" });
  }
};

export default handler;
