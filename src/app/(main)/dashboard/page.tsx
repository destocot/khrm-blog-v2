import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { PostList } from "@/components/PostList";
import { notFound } from "next/navigation";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

interface DashboardPageProps {
  searchParams: { page: string };
}
export default async function DashboardPage({
  searchParams: { page },
}: DashboardPageProps) {
  const session = await auth();
  if (!session) notFound();

  return (
    <main className="mx-auto max-w-3xl space-y-5 p-5">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex justify-between border p-5  shadow">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {session?.user.name}
          </h2>
          <p className="text-sm tracking-tight text-muted-foreground">
            {session?.user.email}
          </p>
        </div>
        <div className="flex flex-col">
          <span>ID# {session?.user.id}</span>
          {session.user.role === "ADMIN" && (
            <Button
              aria-label="Admin panel"
              className="flex gap-2 uppercase"
              variant="destructive"
              asChild
            >
              <Link href="/dashboard/admin">
                <GearIcon width="22" height="22" />
                Admin Panel
              </Link>
            </Button>
          )}
        </div>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
      <PostList userId={session.user.id} page={page} />
    </main>
  );
}
