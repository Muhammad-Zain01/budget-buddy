import prisma from "@/lib/db";

const user = {
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
      },
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
};

export default user;
