"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signout } from "@/actions/auth";
import { Spinner } from "../Spinner";

export const SigninButton = () => {
  const session = useSession();

  switch (session.status) {
    case "loading":
      return (
        <Button className="min-w-20 animate-pulse" variant="inverse">
          <div className="w-6">
            <Spinner />
          </div>
        </Button>
      );
    case "authenticated":
      return (
        <form action={signout}>
          <Button type="submit" className="min-w-20" variant="inverse">
            Sign out
          </Button>
        </form>
      );
    case "unauthenticated":
    default:
      return (
        <Button className="min-w-20" variant="inverse" asChild>
          <Link href="/signin">Sign in</Link>
        </Button>
      );
  }
};
