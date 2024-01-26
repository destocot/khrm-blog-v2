"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const links = [
  { href: "/posts", label: "Posts", authenticated: false },
  { href: "/dashboard", label: "Dashboard", authenticated: true },
  { href: "/posts/create", label: "Create", authenticated: true },
  { href: "/posts/search", label: "Search", authenticated: false },
];

export const Navlinks = () => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <>
      {links.map(({ href, label, authenticated }) => {
        if (session.status !== "authenticated" && authenticated) {
          return null;
        }
        return (
          <li key={href}>
            <Button
              variant="link"
              asChild
              className={cn("", {
                "opacity-50 hover:no-underline": pathname === href,
              })}
            >
              <Link href={href}>{label}</Link>
            </Button>
          </li>
        );
      })}
    </>
  );
};
