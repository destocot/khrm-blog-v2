"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { links } from "./Navbar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Navlink } from "./Navlink";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SigninButton } from "./SigninButton";

export const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <Sheet
        open={open}
        onOpenChange={() => {
          setOpen(!open);
        }}
      >
        <SheetTrigger>
          <HamburgerMenuIcon width="22" height="22" />
        </SheetTrigger>
        <SheetContent side="left" className="w-1/2">
          <SheetHeader className="text-left">
            <SheetTitle>KhrmBlog</SheetTitle>
            <SheetDescription>
              <ul className="space-y-5">
                {links.map(({ href, label, authenticated }) => (
                  <li key={href}>
                    <Navlink
                      href={href}
                      label={label}
                      authenticated={authenticated}
                    />
                  </li>
                ))}
                <li>
                  <SigninButton />
                </li>
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
