import { htmlToString } from "@/lib/utils";
import Link from "next/link";

export const PostContent = ({
  slug,
  title,
  body,
}: {
  slug: string;
  title: string;
  body: string;
}) => {
  return (
    <Link href={`/posts/view/${slug}`} className="block grow">
      <h2 className="line-clamp-1 truncate text-wrap text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="line-clamp-2 max-w-prose truncate text-wrap">
        {htmlToString(body)}
      </p>
    </Link>
  );
};
