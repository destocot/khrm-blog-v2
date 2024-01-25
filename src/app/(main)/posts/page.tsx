import { PostList } from "@/components/PostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
};

interface PostPageProps {
  searchParams: { page?: string };
}

export default async function PostPage({
  searchParams: { page },
}: PostPageProps) {
  return (
    <main className="max-w-3xl p-5 mx-auto space-y-5">
      <h1 className="text-3xl font-bold tracking-tight">Recent Posts</h1>
      <PostList page={page} />
    </main>
  );
}
