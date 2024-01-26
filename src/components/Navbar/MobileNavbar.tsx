"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SigninButton } from "./SigninButton";
import { Navlinks } from "./Navlinks";

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
            <SheetDescription asChild>
              <ul className="space-y-5">
                <Navlinks />
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
