import { NextApiRequest, NextApiResponse } from "next";
import user from "@/lib/query/user";
import { HashPassword } from "@/lib/auth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { token, password } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const selectedUser = await user.getUserByToken(token);

    if (selectedUser) {
      const hashedPassword = await HashPassword(password);
      await user.updateUser(selectedUser.id, {
        password: hashedPassword,
      });

      await user.updateToken(selectedUser.id, "", new Date(0)); 

      return res
        .status(200)
        .json({ status: true, message: "Password Updated Successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("Error verifying reset token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
