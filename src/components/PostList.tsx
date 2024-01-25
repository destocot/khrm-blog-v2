import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Pagination } from "./Pagination";
import { PostItem } from "./Post/PostItem";
import { parsePage } from "@/lib/utils";

const POSTS_PER_PAGE = 6;

async function retrievePosts(
  authorId: string | undefined,
  query: string | undefined,
  page: string | undefined
) {
  const pageNumber = parsePage(page);

  const where: Prisma.PostWhereInput = {};
  if (authorId) where.authorId = authorId;
  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { body: { contains: query, mode: "insensitive" } },
      { tags: { some: { name: { contains: query, mode: "insensitive" } } } },
    ];
  }

  const posts = await prisma.$transaction([
    prisma.post.findMany({
      where,
      include: { author: true, tags: true },
      take: POSTS_PER_PAGE,
      skip: (pageNumber - 1) * POSTS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.count({
      where,
    }),
  ]);
  return posts;
}

interface PostListProps {
  userId?: string;
  query?: string;
  page?: string;
}

export const PostList = async ({ userId, query, page }: PostListProps) => {
  const [posts, count] = await retrievePosts(userId, query, page);

  return (
    <div className="space-y-5">
      <div className="space-y-5">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      {count > POSTS_PER_PAGE && <Pagination total={count} page={page} />}
    </div>
  );
};
