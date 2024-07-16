import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { VerifyPassword } from "@/lib/auth";
import user from "@/lib/user";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "cred",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const data = await user.getUser(username);

        if (!data) {
          throw new Error("NOT_FOUND");
        }
        const hashedPassword = data?.password;
        const isUser = await VerifyPassword(password, hashedPassword);
        if (isUser) {
          return { userId: data?.id, email: data?.email, name: data?.name };
        }
        throw new Error("WRONG_PASSWORD");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      session.user = {
        userId: token?.userId,
        email: token?.email,
        name: token?.name,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export default handler;
