"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { CreatePostFormSchemaType, createPostFormSchema } from "@/lib/schemas";
import { Textarea } from "@/components/ui/textarea";
import { updatePost } from "@/actions/posts";
import { Post, Tag } from "@prisma/client";
import {
  convertImageFileToFileUri,
  hasOwnProperty,
  restorePostTags,
} from "@/lib/utils";
import { ImageInput } from "./ImageInput";
import { TipTapEditor } from "@/components/Tiptap/TipTapEditor";

interface EditPostFormProps {
  post: Post & {
    tags: Tag[];
  };
}

export const EditPostForm = ({ post }: EditPostFormProps) => {
  const router = useRouter();

  const form = useForm<CreatePostFormSchemaType>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
      tags: restorePostTags(post.tags),
    },
  });
  const { handleSubmit, control, setError } = form;

  async function onSubmit(values: CreatePostFormSchemaType) {
    let fileUri;
    if (values.image) {
      fileUri = await convertImageFileToFileUri(values.image);
      delete values.image;
    }
    const { error, status } = (await updatePost(values, fileUri, post)) ?? {
      error: null,
    };
    switch (status) {
      case 401:
        router.replace("/signin");
        break;
      case 400:
        const validationErrors = error;
        for (const fieldName in validationErrors) {
          if (hasOwnProperty(validationErrors, fieldName)) {
            const message = validationErrors[fieldName]?.[0];
            setError(fieldName, { message });
          }
        }
        break;
      case 500:
      default:
        setError("tags", { message: error ?? "Something went wrong!" });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded text-primary sm:p-5 sm:shadow-custom sm:dark:shadow-muted"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-lg font-semibold">Title</FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="body"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Body</FormLabel>
              <FormControl>
                <TipTapEditor onChange={onChange} defaultValue={value} />
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Image</FormLabel>
              <FormControl>
                <ImageInput
                  field={field}
                  postImage={post.image}
                  postId={post.id}
                />
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Tags (Max 3)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your post tags below. Each tag should start with a '#' and is separated by commas.
          e.g. #tag1, #tag2, #tag3"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <Button aria-label="Edit post" type="submit">
          Update
        </Button>
      </form>
    </Form>
  );
};
