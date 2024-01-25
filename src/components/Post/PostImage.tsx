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
    <div className="px-3 py-1 self-center">
      <Link href={`/posts/view/${slug}`} className="block min-w-28">
        {image ? (
          <Image
            src={image}
            alt={`${title} image`}
            width={300}
            height={300}
            className="object-cover w-28 h-28 aspect-square rounded block"
          />
        ) : (
          <div className="w-28 h-28 aspect-square bg-primary rounded" />
        )}
      </Link>
    </div>
  );
};
