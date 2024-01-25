import { Tag } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasOwnProperty<T extends object>(
  data: T,
  key: any,
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(data, key);
}

export function generateSlug(title: string) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");

  const random = Date.now().toString().slice(7);

  return `${slug}-${random}`;
}

export async function delay(ms = 1000) {
  await new Promise((res) => setTimeout(res, ms));
}

export function formatPostTags(tags: string) {
  const regex = /[^a-zA-Z#]+/g;
  const trimmed = tags.toLowerCase().replace(regex, "");

  if (!trimmed.includes("#")) return [];

  const formatted = trimmed
    .split("#")
    .filter((t) => t.length >= 2)
    .map((t) => {
      return { name: t };
    });

  return formatted;
}

export function restorePostTags(tags: Tag[] | undefined) {
  if (!tags || !tags.length) return "";

  const formatted = tags.reduce((accu, curr, i) => {
    if (i === tags.length - 1) {
      return accu + `#${curr.name}`;
    }
    return accu + `#${curr.name}, `;
  }, "");

  return formatted;
}

export async function convertImageFileToFileUri(image: File) {
  const arrayBuffer = await image.arrayBuffer();
  const mime = image.type;
  const encoding = "base64";
  const base64Data = Buffer.from(arrayBuffer).toString(encoding);
  const fileUri = `data:${mime};${encoding},${base64Data}`;
  return fileUri;
}

export function extractPublicIdFromCloudinaryUrl(url: string) {
  const parts = url.split("/");
  const folderName = parts.at(-2);
  const fileName = parts.at(-1);
  const fileNameWithoutExtension = fileName?.split(".")[0];

  const publicId = `${folderName}/${fileNameWithoutExtension}`;
  return publicId;
}

export function debounce(callback: Function, delay = 2000) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function parsePage(page: string | undefined) {
  if (!page) return 1;

  const parsed = parseInt(page);
  if (isNaN(parsed)) return 1;

  return Math.max(1, parsed);
}

export function htmlToString(html: string) {
  const regex = /<[^>]*>/g;
  return html.replace(regex, " ");
}
