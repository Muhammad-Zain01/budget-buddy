import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import userQuery from "@/lib/query/user";
import emailLib from "@/lib/email-api";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await userQuery.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = bcrypt.genSaltSync(16);
    const expirationTime = new Date(Date.now() + 7200000);

    await userQuery.updateToken(user.id, token, expirationTime);
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await await emailLib.send("forgot-password", {
      to: user.email,
      name: user.name,
      link: resetLink,
    });

    res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    console.error("Error sending reset link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
