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
      },
    });
  },
};

export default user;
