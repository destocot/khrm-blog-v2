import Link from "next/link";
import { MobileNavbar } from "./MobileNavbar";
import { SigninButton } from "./SigninButton";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navlinks } from "./Navlinks";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-background shadow">
      <nav className="mx-auto flex max-w-3xl items-center justify-between p-5">
        <div className="flex items-center gap-5">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="avatar" loading="lazy" />
            <AvatarFallback>KA</AvatarFallback>
          </Avatar>
          <Link href="/" className="text-3xl font-bold tracking-tight">
            KhrmBlog
          </Link>
        </div>
        <ThemeToggler />
        <ul className="hidden gap-2 md:flex">
          <Navlinks />
          <li>
            <SigninButton />
          </li>
        </ul>
        <MobileNavbar />
      </nav>
    </header>
  );
};
