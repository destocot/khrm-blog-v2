import { PostList } from "@/components/PostList";
import { Spinner } from "@/components/Spinner";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <main className="max-w-3xl p-5 mx-auto space-y-5">
      <h1 className="text-3xl font-bold tracking-tight">Recent Posts</h1>
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </main>
  );
}
