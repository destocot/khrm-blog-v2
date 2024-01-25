"use client";

import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchbarProps {
  query: string | undefined;
}

export const Searchbar = ({ query }: SearchbarProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (e.target.value) {
      e.target.value.length > 2 && params.set("query", e.target.value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params}`);
  };

  const debouncedHandleSearch = debounce(handleSearch, 600);

  return (
    <div>
      <div className="relative">
        <Input
          onChange={debouncedHandleSearch}
          defaultValue={query}
          placeholder="Search for a post..."
        />
        <MagnifyingGlassIcon
          width="22"
          height="22"
          className="absolute top-1/2 -translate-y-1/2 right-2"
        />
      </div>
    </div>
  );
};
