"use server";
import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/db";
import {
  extractPublicIdFromCloudinaryUrl,
  formatPostTags,
  generateSlug,
} from "@/lib/utils";
import { CreatePostFormSchemaType, createPostFormSchema } from "@/lib/schemas";
import { Post } from "@prisma/client";
import { UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { CreatePostResponseType } from "@/lib/types";
import sanitizeHtml from "sanitize-html";

/**
 * createPost
 *
 * @param values
 * @returns
 */
export async function createPost(
  values: Omit<CreatePostFormSchemaType, "image">,
  fileUri: string | undefined,
): Promise<CreatePostResponseType> {
  const session = await auth();
  if (!session) return { error: "Unauthorized", status: 401 };

  const parsed = createPostFormSchema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return { error: fieldErrors, status: 400 };
  }

  const { title, body: unsanitizedBody, tags } = parsed.data;
  const slug = generateSlug(title);
  const body = sanitizeHtml(unsanitizedBody);

  let postTags;
  if (tags) {
    const formatted = formatPostTags(tags).slice(0, 3);
    postTags = formatted.length ? formatted : undefined;
  }

  let postImage;
  try {
    if (fileUri) {
      postImage = await uploadToCloudinary(fileUri);
    }

    await prisma.post.create({
      data: {
        title,
        body,
        image: postImage,
        slug,
        author: { connect: { id: session.user.id } },
        tags: {
          createMany: postTags && { data: postTags },
        },
      },
    });
  } catch (error) {
    if (postImage) {
      await deleteFromCloudinary(postImage);
    }

    if (error instanceof PrismaClientValidationError) {
      return {
        error: "Oops, please check your post content and try again.",
        status: 500,
      };
    }
    console.error(error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/dashboard/admin");
  redirect(`/posts/view/${slug}`);
}

/**
 * updatePost
 *
 * @param values
 * @param fileUri
 * @param post
 * @returns
 */
export async function updatePost(
  values: Omit<CreatePostFormSchemaType, "image">,
  fileUri: string | undefined,
  post: Post,
): Promise<CreatePostResponseType> {
  const session = await auth();
  if (!session) return { error: "Unauthorized", status: 401 };

  // TODO: Check if post author matches session user

  const parsed = createPostFormSchema.safeParse(values);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return { error: fieldErrors, status: 400 };
  }

  const { title, body, tags } = parsed.data;
  const slug = generateSlug(title);

  let updatedTags;
  if (tags) {
    const formatted = formatPostTags(tags).slice(0, 3);
    updatedTags = formatted.length ? formatted : undefined;
  }

  let newPostImage;
  try {
    if (fileUri) {
      newPostImage = await uploadToCloudinary(fileUri);
    }

    if (post.image) {
      await deleteFromCloudinary(post.image);
    }

    await prisma.post.update({
      where: { id: post.id, authorId: session.user.id },
      data: {
        title,
        body,
        image: newPostImage,
        slug,
        tags: {
          deleteMany: { postId: post.id },
          createMany: updatedTags && { data: updatedTags },
        },
      },
    });
  } catch (error) {
    if (newPostImage) {
      await deleteFromCloudinary(newPostImage);
    }

    if (error instanceof PrismaClientValidationError) {
      return {
        error: "Oops, please check your post content and try again.",
        status: 500,
      };
    }
    console.error(error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/dashboard/admin");
  redirect(`/posts/view/${slug}`);
}

/**
 * deletePost
 *
 * @param postId
 * @param onAdminPanel
 * @returns
 */

export async function deletePost(postId: string, onAdminPanel?: boolean) {
  const session = await auth();
  if (!session) return { error: "no session found" };

  const { id: userId, role } = session.user;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { image: true, authorId: true },
    });

    if (post?.image) {
      await deleteFromCloudinary(post.image);
    }

    if (role === "ADMIN" || post?.authorId === userId) {
      await prisma.post.delete({
        where: { id: postId },
      });
    }
  } catch (error) {
    throw error;
  }

  if (onAdminPanel) {
    revalidatePath("/dashboard/admin");
  } else {
    revalidatePath("/");
    redirect("/");
  }
}

/**
 * deletePostImage
 *
 * @param postImage
 * @param postId
 */
export async function deletePostImage(postId: string, postImage: string) {
  try {
    await deleteFromCloudinary(postImage);

    await prisma.post.update({
      where: { id: postId },
      data: {
        image: null,
      },
    });
    revalidatePath("/posts");
  } catch (error) {
    throw error;
  }
}

/**
 * uploadToCloudinary
 *
 * @param fileUri
 * @returns
 */
async function uploadToCloudinary(fileUri: string) {
  const res: UploadApiResponse | undefined = await new Promise((resolve) => {
    cloudinary.uploader.upload(
      fileUri,
      {
        folder: "khrm-blog",
        transformation: { width: 300, height: 300, crop: "fill" },
      },
      (e, result) => {
        return resolve(result);
      },
    );
  });
  return res?.secure_url;
}

/**
 * deleteFromCloudinary
 *
 * @param imageUrl
 */
async function deleteFromCloudinary(imageUrl: string) {
  const publicId = extractPublicIdFromCloudinaryUrl(imageUrl);
  await cloudinary.uploader.destroy(publicId);
}
