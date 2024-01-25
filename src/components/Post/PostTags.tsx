import { cn } from "@/lib/utils";
import { Tag, User } from "@prisma/client";
import Link from "next/link";
import { badgeVariants } from "../ui/badge";

export const PostTags = ({
  tags,
  createdAt,
  author,
  slug,
}: {
  tags: Tag[];
  createdAt: Date;
  author: User;
  slug: string;
}) => {
  return (
    <div className="flex items-center justify-end gap-4">
      <Link
        href={`/posts/view/${slug}`}
        className="h-full grow border border-transparent"
      />
      <div className="hidden gap-5 md:flex">
        {tags.map((tag) => (
          <Link
            href={`/posts/search?query=${tag.name}`}
            key={tag.id}
            className={cn(
              badgeVariants(),
              "inline-block min-w-10 rounded-full px-1.5 py-0.5 text-center uppercase",
            )}
          >
            {tag.name}
          </Link>
        ))}
      </div>
      <small className="text-muted-foreground">
        {new Date(createdAt).toDateString()} | {author.name}
      </small>
    </div>
  );
};
