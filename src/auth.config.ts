import type { NextAuthConfig } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export default {
  pages: {
    signIn: "/signin",
  },
  providers: [],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: Session; token?: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.role = user.role;
        token.id = user.id;
      }

      return token;
    },
  },
} satisfies NextAuthConfig;
