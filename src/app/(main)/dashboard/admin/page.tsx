import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { AdminPosts } from "./AdminPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") notFound();

  return (
    <main className="max-w-3xl p-5 mx-auto space-y-5">
      <h1 className="text-3xl font-bold tracking-tight border-b-2 pb-2">
        Admin Panel
      </h1>
      <AdminPosts />
    </main>
  );
}
