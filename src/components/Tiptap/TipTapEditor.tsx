"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import TipTapMenuBar from "./TipTapMenubar";

interface TipTapEditor {
  onChange: (...event: any[]) => void;
  defaultValue?: string;
}

export const TipTapEditor = ({ onChange, defaultValue = "" }: TipTapEditor) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          "e.g. Explore the world of Artificial Intelligence (AI) in this snapshot overview. From machine learning to smart algorithms, discover how AI impacts industries and daily life.",
      }),
      Link.configure({
        linkOnPaste: false,
        openOnClick: false,
      }),
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => {
      const HTML = editor.getHTML();
      onChange(HTML);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring prose dark:prose-invert max-w-none prose-p:m-0 max-h-[350px] overflow-y-scroll",
      },
    },
  });

  return (
    <>
      {editor && <TipTapMenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </>
  );
};
