import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { PostMutations } from "./PostMutations";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";
import Image from "next/image";
import { Metadata } from "next";
import { cache } from "react";
import { PostBody } from "./PostBody";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: { title: true },
  });
  return posts.map(({ title }) => title);
}

export async function generateMetadata({
  params: { slug },
}: PostDetailsPageProps): Promise<Metadata> {
  const post = await cachedRetrievePost(slug);

  return {
    title: post.title,
  };
}

async function retrievePost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { tags: true, author: true },
  });

  if (!post) notFound();

  return post;
}
const cachedRetrievePost = cache(retrievePost);

interface PostDetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function PostDetailsPage({
  params: { slug },
}: PostDetailsPageProps) {
  const post = await cachedRetrievePost(slug);
  return (
    <main className="mx-auto max-w-3xl space-y-5 p-5">
      <PostImage image={post.image} title={post.title} />
      <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <PostMutations slug={post.slug} id={post.id} authorId={post.authorId} />
      </div>
      <PostBody body={post.body} />
      <div className="flex gap-5 self-end">
        {post.tags.map((tag) => (
          <Link
            href={`/posts/search?query=${tag.name}`}
            key={tag.id}
            className={cn(badgeVariants(), "rounded-full")}
          >
            {tag.name}
          </Link>
        ))}
      </div>
      <small className="block text-muted-foreground">
        {new Date(post.createdAt).toDateString()} | {post.author.name}
      </small>
    </main>
  );
}

function PostImage({ image, title }: { image: string | null; title: string }) {
  if (!image) {
    return <div className="aspect-square h-28 w-full rounded bg-primary" />;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="overflow-hidden rounded bg-primary-foreground bg-cover bg-no-repeat bg-blend-overlay"
    >
      <div className="relative mx-auto h-28 max-w-[300px]">
        <Image
          src={image}
          alt={`${title} image`}
          fill
          sizes="300px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
