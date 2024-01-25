import { notFound } from "next/navigation";
import { EditPostForm } from "./EditPostForm";
import prisma from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Post",
};

async function retrievePost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { tags: true },
  });

  return post;
}

interface EditPostPageProps {
  params: { slug: string };
}

export default async function EditPostPage({
  params: { slug },
}: EditPostPageProps) {
  const post = await retrievePost(slug);
  if (!post) notFound();

  return (
    <main className="max-w-3xl p-5 mx-auto space-y-5">
      <h1 className="text-3xl font-bold tracking-tight">Update</h1>
      <EditPostForm post={post} />
    </main>
  );
}
