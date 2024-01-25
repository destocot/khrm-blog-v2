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
    <main className="max-w-3xl p-5 mx-auto space-y-5">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="shadow p-5 flex border  justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {session?.user.name}
          </h2>
          <p className="text-sm text-muted-foreground tracking-tight">
            {session?.user.email}
          </p>
        </div>
        <div className="flex flex-col">
          <span>ID# {session?.user.id}</span>
          {session.user.role === "ADMIN" && (
            <Button
              className="uppercase flex gap-2"
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
