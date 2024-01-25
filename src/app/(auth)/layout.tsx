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
    <main className="grid place-items-center min-h-screen relative">
      {children}
      <div className="absolute top-5 left-5">
        <div className="flex gap-5 items-center">
          <Button
            className=" hover:scale-110 transition-transform"
            size="icon"
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
