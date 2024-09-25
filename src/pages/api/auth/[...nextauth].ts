import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { VerifyPassword } from "@/lib/auth";
import user from "@/lib/query/user";
import { AdapterUser } from "next-auth/adapters";

interface ExtendedAdapterUser extends AdapterUser {
  userId?: string;
}

export const authOptions: NextAuthOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
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
      // @ts-ignore
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
          return {
            userId: data?.id,
            email: data?.email,
            name: data?.name,
            isVerified: data.isVerfied,
          };
        }
        throw new Error("WRONG_PASSWORD");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user: userData, account, profile }) {
      if (account?.provider === "google" && userData) {
        const email = userData.email;
        if (email) {
          let existingUser = await user.getUserByEmail(email);
          if (!existingUser) {
            existingUser = await user.addUser({
              email: email,
              name: profile?.name || "",
              profileImage: userData.image || "",
              password: userData.id as string,
              isVerfied: true,
            });
          }
          if (existingUser) {
            // @ts-ignore
            (userData as ExtendedAdapterUser).userId = existingUser.id;
            return true;
          }
        }
      }
      // For non-Google sign-ins or if there's no email
      return !!userData;
    },
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        // @ts-ignore
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
