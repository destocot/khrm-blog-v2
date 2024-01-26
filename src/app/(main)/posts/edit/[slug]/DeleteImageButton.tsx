"use client";
import { deletePostImage } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

interface DeleteImageButtonProps {
  postId: string;
  postImage: string;
}

export const DeleteImageButton = ({
  postId,
  postImage,
}: DeleteImageButtonProps) => {
  const handleClick = async () => {
    deletePostImage(postId, postImage);
  };

  return (
    <Button
      aria-label="Delete image"
      type="button"
      variant="destructive"
      className="h-20 hover:scale-105"
      onClick={handleClick}
    >
      <TrashIcon width="22" height="22" />
    </Button>
  );
};
