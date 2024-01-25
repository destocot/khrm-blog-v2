"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface NavlinkProps {
  href: string;
  label: string;
  authenticated: boolean;
}

export const Navlink = ({ href, label, authenticated }: NavlinkProps) => {
  const pathname = usePathname();
  const session = useSession();

  if (session.status !== "authenticated" && authenticated) {
    return null;
  }

  return (
    <Button
      variant="link"
      asChild
      className={cn("", {
        "hover:no-underline opacity-50": pathname === href,
      })}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
