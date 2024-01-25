import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);

const authRoutes = ["/signin", "/signup"];
const publicRoutes = ["/", "/posts", "/posts/search"];

export default auth((req) => {
  const session = Boolean(req.auth);
  const { pathname } = req.nextUrl;

  if (publicRoutes.includes(pathname) || pathname.startsWith("/posts/view"))
    return null;

  if (session && authRoutes.includes(pathname))
    return NextResponse.redirect(new URL("/", req.url));

  if (!session && !authRoutes.includes(pathname))
    return NextResponse.redirect(new URL("/signin", req.url));
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
