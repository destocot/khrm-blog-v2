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
import { convertImageFileToFileUri, hasOwnProperty } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CreatePostFormSchemaType, createPostFormSchema } from "@/lib/schemas";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/actions/posts";
import { TipTapEditor } from "@/components/Tiptap/TipTapEditor";

export const CreatePostForm = () => {
  const router = useRouter();

  const form = useForm<CreatePostFormSchemaType>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreatePostFormSchemaType) {
    let fileUri;
    if (values.image) {
      fileUri = await convertImageFileToFileUri(values.image);
      delete values.image;
    }

    const { error, status } = (await createPost(values, fileUri)) ?? {
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
            <FormItem>
              <FormLabel className="text-lg font-semibold text-primary">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. AI Unveiled: A Quick Dive into Artificial Intelligence"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="body"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-primary">
                Body
              </FormLabel>
              <FormControl>
                <TipTapEditor onChange={onChange} />
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel className="text-lg  font-semibold text-primary">
                Image
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  accept="image/png, image/jpeg"
                  className="cursor-pointer file:cursor-pointer file:bg-primary-foreground file:text-primary"
                  onChange={(event) => {
                    if (event.target.files) {
                      onChange(event.target.files[0]);
                    }
                  }}
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
              <FormLabel className="text-lg font-semibold text-primary">
                Tags
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
        <Button aria-label="Create post" disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

// Textarea Body
/* <FormField
          control={control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-primary">
                Body
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Explore the world of Artificial Intelligence (AI) in this snapshot overview. From machine learning to smart algorithms, discover how AI impacts industries and daily life."
                  className="min-h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        /> */
