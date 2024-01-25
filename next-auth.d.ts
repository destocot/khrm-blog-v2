import "next-auth";

declare module "@auth/core/types" {
  interface User extends DefaultUser {
    id: string;
    role: "USER" | "ADMIN";
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "USER" | "ADMIN";
  }
}
