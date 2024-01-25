import Link from "next/link";
import { Navlink } from "./Navlink";
import { MobileNavbar } from "./MobileNavbar";
import { SigninButton } from "./SigninButton";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const links = [
  { href: "/posts", label: "Posts", authenticated: false },
  { href: "/dashboard", label: "Dashboard", authenticated: true },
  { href: "/posts/create", label: "Create", authenticated: true },
  { href: "/posts/search", label: "Search", authenticated: false },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-background shadow">
      <nav className="mx-auto flex max-w-3xl items-center justify-between p-5">
        <div className="flex items-center gap-5">
          <Avatar>
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback>KA</AvatarFallback>
          </Avatar>
          <Link href="/" className="text-3xl font-bold tracking-tight">
            KhrmBlog
          </Link>
        </div>
        <ThemeToggler />
        <ul className="hidden gap-2 md:flex">
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
        <MobileNavbar />
      </nav>
    </header>
  );
};
