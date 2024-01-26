import { deletePost } from "@/actions/posts";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

interface DeletePostButtonProps {
  id: string;
  onAdminPanel?: boolean;
}

export const DeletePostButton = ({
  id,
  onAdminPanel,
}: DeletePostButtonProps) => {
  return (
    <form action={deletePost.bind(null, id, onAdminPanel)}>
      {onAdminPanel ? (
        <Button
          aria-label="Delete post"
          type="submit"
          variant="destructive"
          size="icon"
        >
          <TrashIcon width="22" height="22" />
        </Button>
      ) : (
        <Button
          aria-label="Delete post"
          type="submit"
          variant="destructive"
          size="icon"
          className="min-w-24 sm:min-w-0"
        >
          <TrashIcon width="22" height="22" />
          <span className="ms-2 sm:hidden">Delete</span>
        </Button>
      )}
    </form>
  );
};
