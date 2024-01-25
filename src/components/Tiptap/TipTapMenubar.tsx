import {
  FontBoldIcon,
  FontItalicIcon,
  CodeIcon,
  CodeSandboxLogoIcon,
  ListBulletIcon,
  QuoteIcon,
  ResetIcon,
  Link2Icon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { setLink } from "./setLink";

export default function TipTapMenuBar({ editor }: { editor: Editor }) {
  return (
    <div className="mb-2 flex gap-4 rounded border border-muted p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn("rounded shadow-custom", {
          "text-slate-500": editor.isActive("bold"),
        })}
      >
        <FontBoldIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn("rounded shadow-custom", {
          "text-slate-500": editor.isActive("italic"),
        })}
      >
        <FontItalicIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn("rounded shadow-custom", {
          "text-slate-500": editor.isActive("code"),
        })}
      >
        <CodeIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={cn("rounded shadow-custom", {
          "text-slate-500": editor.isActive("bulletList"),
        })}
      >
        <ListBulletIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={cn("rounded shadow-custom", {
          "opacity-50": editor.isActive("orderedList"),
        })}
      >
        <ListBulletIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        className={cn("rounded shadow-custom", {
          "text-slate-500": editor.isActive("codeBlock"),
        })}
      >
        <CodeSandboxLogoIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        className={cn("rounded shadow-custom", {
          "text-slate-500": editor.isActive("blockquote"),
        })}
      >
        <QuoteIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className={"rounded shadow-custom"}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <ResetIcon className="h-6 w-6" />
      </button>
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className={"rounded shadow-custom"}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="h-6 w-6" />
      </button> */}
      <button
        type="button"
        onClick={() => setLink(editor)}
        className={"rounded shadow-custom"}
      >
        <Link2Icon className="h-6 w-6" />
      </button>
    </div>
  );
}
