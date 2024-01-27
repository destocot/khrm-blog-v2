import { deletePost } from "@/actions/posts";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

interface DeletePostButtonProps {
  id: string;
  title: string;
  onAdminPanel?: boolean;
}

export const DeletePostButton = ({
  id,
  title,
  onAdminPanel,
}: DeletePostButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Delete post"
          type="button"
          variant="destructive"
          size="icon"
          className="min-w-fit px-2 sm:px-0"
        >
          <TrashIcon width="22" height="22" />
          <span className="ms-2 sm:hidden">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs rounded">
        <DialogHeader>
          <DialogDescription>
            Are you sure you want to delete {title}?
          </DialogDescription>
        </DialogHeader>
        <form action={deletePost.bind(null, id, onAdminPanel)}>
          <div className="flex gap-2">
            <Button
              aria-label="Delete post"
              type="submit"
              variant="destructive"
              className="w-1/2"
            >
              Yes
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-1/2">
                No
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
