import NextAuth from "next-auth";
import authConfig from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/db";
import { signinFormSchema } from "@/lib/schemas";
import * as bcrypt from "bcryptjs";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsed = signinFormSchema.safeParse(credentials);

        if (parsed.success) {
          const { email, password } = parsed.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          const match = await bcrypt.compare(password, user.password);

          return match ? user : null;
        }
        return null;
      },
    }),
  ],
});
