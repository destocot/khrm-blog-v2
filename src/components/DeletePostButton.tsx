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
        <Button type="submit" variant="destructive" size="icon">
          <TrashIcon width="22" height="22" />
        </Button>
      ) : (
        <Button
          type="submit"
          variant="destructive"
          size="icon"
          className="min-w-24 sm:min-w-0"
        >
          <TrashIcon width="22" height="22" />
          <span className="sm:hidden ms-2">Delete</span>
        </Button>
      )}
    </form>
  );
};
