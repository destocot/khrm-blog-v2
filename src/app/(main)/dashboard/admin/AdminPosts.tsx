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
        <thead className="border-b font-semibold dark:border-neutral-500 uppercase hidden sm:table-header-group">
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
              className="border-b dark:border-neutral-500 flex flex-col sm:table-row py-2 sm:pb-0"
            >
              <td className="whitespace-nowrap sm:px-3 sm:py-2">
                <span className="sm:hidden font-semibold mr-2">Created:</span>
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap sm:px-3 sm:py-2">
                <span className="sm:hidden font-semibold mr-2">Title:</span>
                <Link
                  href={`/posts/view/${post.slug}`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "truncate p-0"
                  )}
                >
                  {post.title}
                </Link>
              </td>
              <td className="whitespace-nowrap sm:px-3 sm:py-2">
                <span className="sm:hidden font-semibold mr-2">Author:</span>
                {post.author.name}
              </td>
              <td className="whitespace-nowrap sm:px-6 sm:py-4 ">
                <DeletePostButton id={post.id} onAdminPanel={true} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
