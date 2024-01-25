import { Metadata } from "next";
import { CreatePostForm } from "./CreatePostForm";

export const metadata: Metadata = {
  title: "Create Post",
};

export default function CreatePostPage() {
  return (
    <main className="max-w-3xl p-5 mx-auto space-y-5">
      <h1 className="text-3xl font-bold tracking-tight">Create</h1>
      <CreatePostForm />
    </main>
  );
}
