import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.includes("/register") || pathname.includes("/login")) {
    if (token) return NextResponse.redirect(new URL("/dashboard", req.url));
  } else {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard",
    "/categories",
    "/accounts",
    "/transactions",
    "/goals",
    "/insights",
    "/settings",
  ],
};
