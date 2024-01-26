import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig);

const authRoutes = ["/signin", "/signup"];
const publicRoutes = ["/", "/posts", "/posts/search"];

export default auth((req) => {
  const { nextUrl } = req;
  const session = Boolean(req.auth);

  if (
    publicRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/posts/view")
  )
    return null;

  if (session && authRoutes.includes(nextUrl.pathname))
    return Response.redirect(new URL("/", nextUrl));

  if (!session && !authRoutes.includes(nextUrl.pathname))
    return Response.redirect(new URL("/signin", nextUrl));

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
