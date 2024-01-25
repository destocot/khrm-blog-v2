import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ControllerRenderProps } from "react-hook-form";
import { DeleteImageButton } from "./DeleteImageButton";

interface ImageInputProps {
  field: ControllerRenderProps<
    {
      title: string;
      body: string;
      image?: File | undefined;
      tags?: string | undefined;
    },
    "image"
  >;
  postImage: string | null;
  postId: string;
}

export const ImageInput = ({
  field: { value, onChange, ...field },
  postImage,
  postId,
}: ImageInputProps) => {
  if (postImage) {
    return (
      <div className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:outline-none hover:ring-1 hover:ring-ring justify-between">
        <div className="grow ">
          <Image
            src={postImage}
            alt="current post image"
            width={300}
            height={300}
            className="object-cover w-20 h-20 aspect-square rounded block"
          />
        </div>
        <DeleteImageButton postId={postId} postImage={postImage} />
      </div>
    );
  }

  return (
    <Input
      {...field}
      type="file"
      accept="image/png, image/jpeg"
      className="file:text-primary file:bg-primary-foreground cursor-pointer file:cursor-pointer"
      onChange={(event) => {
        if (event.target.files) {
          onChange(event.target.files[0]);
        }
      }}
    />
  );
};
