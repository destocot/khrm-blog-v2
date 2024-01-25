import { Editor } from "@tiptap/react";

export function setLink(editor: Editor) {
  const previousUrl = editor.getAttributes("link").href;
  let url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  if (!/^https?:\/\//.test(url)) {
    url = "//" + url;
  }

  // update link
  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
}
