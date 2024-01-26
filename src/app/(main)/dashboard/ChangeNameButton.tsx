"use client";

import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signout, updateName } from "@/actions/auth";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ChangeNameButtonProps {
  name: string | null | undefined;
}

export const ChangeNameButton = ({ name }: ChangeNameButtonProps) => {
  const [state, formAction] = useFormState(updateName, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.status === 200) {
      signout().then(() => {
        router.replace("/signin");
      });
    }
  }, [state, router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Edit post"
          variant="ghost"
          size="icon"
          className="h-5 w-5"
        >
          <Pencil2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Username</DialogTitle>
          <DialogDescription>
            Heads up! Changing your username means you&apos;ll need to sign in
            again to keep things secure.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <form action={formAction} className="grid flex-1 gap-2">
            <Label htmlFor="name" className="sr-only">
              Link
            </Label>
            <Input defaultValue={name?.toString()} name="name" id="name" />
            {state?.error && (
              <small className="text-warning">{state.error}</small>
            )}
            <DialogFooter className="sm:justify-start">
              <Button type="submit" variant="inverse">
                Update
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
