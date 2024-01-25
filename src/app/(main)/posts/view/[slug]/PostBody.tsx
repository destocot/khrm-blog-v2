"use client";
import { useEffect, useState } from "react";

interface PostBodyProps {
  body: string;
}

export const PostBody = ({ body }: PostBodyProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div
      className="prose dark:prose-invert prose-p:m-0 max-w-none rounded-lg bg-primary-foreground p-5"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};
