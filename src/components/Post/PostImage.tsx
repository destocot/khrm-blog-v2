import Image from "next/image";
import Link from "next/link";

export const PostImage = ({
  slug,
  image,
  title,
}: {
  slug: string;
  image: string | null;
  title: string;
}) => {
  return (
    <div className="self-center px-3 py-1">
      <Link
        aria-label="See post details"
        href={`/posts/view/${slug}`}
        className="relative block aspect-square h-28 w-28 overflow-hidden rounded object-cover"
      >
        {image ? (
          <Image
            src={image}
            alt={`${title} image`}
            fill
            sizes="112px"
            loading="lazy"
          />
        ) : (
          <div className="aspect-square h-28 w-28 rounded bg-primary" />
        )}
      </Link>
    </div>
  );
};
