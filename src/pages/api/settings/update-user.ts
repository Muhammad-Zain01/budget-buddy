import { getUserSession, HashPassword } from "@/lib/auth";
import errors from "@/lib/error";
import user from "@/lib/query/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getUserSession(req, res);

  if (!session) {
    return res.status(401).json({ status: 0, message: errors.UN_AUTHORIZED });
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ message: errors.METHOD_NOT_ALLOWED });
  }

  // @ts-ignore
  const userId = session?.user?.userId;

  try {
    const body = req.body;

    if (body?.email) {
      return res
        .status(400)
        .json({ status: 0, message: errors.EMAIL_UPDATE_NOT_POSSIBLE });
    }

    if (body?.newPassword && body?.currentPassword) {
      if (body.newPassword == body.currentPassword) {
        return res
          .status(400)
          .json({ status: 0, message: errors.NEW_PASSWORD_SAME_AS_CURRENT });
      }

      const isPasswordCorrect = await user.checkUserPassword(
        userId,
        body?.currentPassword
      );

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ status: 0, message: errors.INCORRECT_PASSWORD });
      }
      const newHashedPassword = await HashPassword(body?.newPassword);
      user.updateUser(userId, { password: newHashedPassword });
    } else if (body.image) {
      user.updateUser(userId, { profileImage: body.image });
    } else if (body?.currency) {
      user.updateUser(userId, { currency: body?.currency });
    } else if (body.name) {
      user.updateUser(userId, { name: body?.name });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: errors.SERVER_ERROR });
  }
}
