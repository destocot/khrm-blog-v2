"use client";
import { DeletePostButton } from "@/components/DeletePostButton";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface PostMutationsProps {
  slug: string;
  id: string;
  authorId: string;
}

export const PostMutations = ({ slug, id, authorId }: PostMutationsProps) => {
  const session = useSession();

  if (session.data?.user.id !== authorId) return null;

  return (
    <div className="flex gap-5">
      <Button
        aria-label="Edit post"
        variant="warning"
        size="icon"
        className="min-w-24 sm:min-w-0"
        asChild
      >
        <Link href={`/posts/edit/${slug}`}>
          <Pencil2Icon width="22" height="22" />
          <span className="ms-2 sm:hidden">Edit</span>
        </Link>
      </Button>
      <DeletePostButton id={id} />
    </div>
  );
};
