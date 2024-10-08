import prisma from "@/lib/db";
import { VerifyPassword } from "../auth";

type UserData = {
  name: string;
  username: string;
  email: string;
  password: string;
  verificationCode: string;
};
const user = {
  create: async (data: UserData) => {
    return await prisma.user.create({
      data: data,
    });
  },
  getUser: async (username: string) => {
    return await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: username }],
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        isVerfied: true,
      },
    });
  },
  getUserByEmail: async (email: string) => {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
      },
    });
  },
  getUserFromUserId: async (userId: number) => {
    return await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        currency: true,
        profileImage: true,
        isVerfied: true,
        verificationCode: true,
      },
    });
  },
  verifyUser: async (userId: number) => {
    return await prisma.user.update({
      where: { id: userId },
      data: { isVerfied: true },
    });
  },
  updateCode: async (userId: number, code: string) => {
    return await prisma.user.update({
      where: { id: userId },
      data: { verificationCode: code },
    });
  },
  addUser: async (data: {
    email: string;
    name: string;
    profileImage: string;
    password: string;
    isVerfied: boolean;
  }) => {
    return await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        username: data.name,
        profileImage: data.profileImage,
        password: data.password,
        isVerfied: data.isVerfied,
      },
    });
  },
  checkUserPassword: async (userId: number, password: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    if (!user) {
      return false;
    }

    return await VerifyPassword(password, user.password);
  },
  updateUser: async (
    userId: number,
    data: {
      currency?: string;
      password?: string;
      profileImage?: string;
      name?: string;
    }
  ) => {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: data,
    });
  },
  updateToken: async (
    user_id: number,
    token: string,
    expirationTime: Date
  ) => {
    return await prisma.user.update({
      where: { id: user_id },
      data: { securityToken: token, tokenCreatedOn: expirationTime },
    });
  },
  getUserByToken: async (token: string) => {
    const user = await prisma.user.findFirst({
      where: {
        securityToken: token,
        tokenCreatedOn: {
          gte: new Date(Date.now() - 2 * 60 * 60 * 1000) // Token valid for 2 hours
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        profileImage: true,
        isVerfied: true
      }
    });

    return user;
  }
};

export default user;
