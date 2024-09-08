import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { VerifyPassword } from "@/lib/auth";
import user from "@/lib/query/user";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

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
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user: userData, account, profile }) {
      if (account?.provider === "google") {
        const email = userData?.email;
        let existingUser = await user.getUserByEmail(email as string);
        if (!existingUser) {
          existingUser = await user.addUser({
            email: email as string,
            name: profile?.name || "",
            profileImage: userData?.image || "",
            password: userData.id,
            isVerfied: true,
          });
        }
        // Add userId to the userData object
        userData.userId = existingUser.id;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        userId: token.userId,
        email: token.email,
        name: token.name,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    state: {
      name: `next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

const handler = NextAuth(authOptions);
export default handler;
