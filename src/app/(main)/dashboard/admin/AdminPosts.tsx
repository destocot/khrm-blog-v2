import { DeletePostButton } from "@/components/DeletePostButton";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";

const retrieveAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return posts;
};

export const AdminPosts = async () => {
  const posts = await retrieveAllPosts();

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-semibold tracking-tight">Post List</h2>
      <table className="min-w-full text-left text-sm font-light">
        <thead className="hidden border-b font-semibold uppercase dark:border-neutral-500 sm:table-header-group">
          <tr>
            <th className="px-3 py-2">created</th>
            <th className="px-3 py-2">title</th>
            <th className="px-3 py-2">author</th>
            <th className="px-3 py-2">delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="flex flex-col border-b py-2 dark:border-neutral-500 sm:table-row sm:pb-0"
            >
              <td className="whitespace-nowrap sm:px-3 sm:py-2">
                <span className="mr-2 font-semibold sm:hidden">Created:</span>
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap sm:px-3 sm:py-2">
                <span className="mr-2 font-semibold sm:hidden">Title:</span>
                <Link
                  href={`/posts/view/${post.slug}`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "truncate p-0",
                  )}
                >
                  {post.title}
                </Link>
              </td>
              <td className="whitespace-nowrap sm:px-3 sm:py-2">
                <span className="mr-2 font-semibold sm:hidden">Author:</span>
                {post.author.name}
              </td>
              <td className="whitespace-nowrap sm:px-6 sm:py-4 "></td>
              <DeletePostButton
                id={post.id}
                onAdminPanel={true}
                title={post.title}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
