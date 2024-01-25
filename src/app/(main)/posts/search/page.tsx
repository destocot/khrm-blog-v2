import { PostList } from "@/components/PostList";
import { Searchbar } from "./Searchbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Posts",
};

interface SearchPageProps {
  searchParams: { query: string; page: string };
}

export default function SearchPage({
  searchParams: { query, page },
}: SearchPageProps) {
  return (
    <main className="max-w-3xl p-5 mx-auto space-y-5">
      <h1 className="text-3xl font-bold tracking-tight">
        {query ? (
          <span>
            Search Results For{" "}
            <span className="italic">&quot;{query}&quot;</span>
          </span>
        ) : (
          <span>Search Posts</span>
        )}
      </h1>
      <Searchbar query={query} />
      <PostList query={query} page={page} />
    </main>
  );
}
