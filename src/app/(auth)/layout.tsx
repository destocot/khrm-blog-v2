import { ThemeToggler } from "@/components/Theme/ThemeToggler";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative grid min-h-screen place-items-center">
      {children}
      <div className="absolute left-5 top-5">
        <div className="flex items-center gap-5">
          <Button
            className=" transition-transform hover:scale-110"
            size="icon"
            aria-label="Home"
            asChild
          >
            <Link href="/">
              <HomeIcon width="22" height="22" />
            </Link>
          </Button>
          <ThemeToggler />
        </div>
      </div>
    </main>
  );
}
