import * as z from "zod";

export const createPostFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  body: z.string().min(20, {
    message: "Body must be at least 20 characters.",
  }),
  image: z.instanceof(File).optional(),
  // TODO: Validate
  tags: z.string().optional(),
});
export type CreatePostFormSchemaType = z.infer<typeof createPostFormSchema>;

export const signupFormSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 charcters.",
  }),
});
export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;

export const signinFormSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z.string().min(2, {
    message: "Password must be at least 2 charcters.",
  }),
});
export type SigninFormSchemaType = z.infer<typeof signinFormSchema>;
