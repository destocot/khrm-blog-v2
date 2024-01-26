"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parsePage } from "@/lib/utils";

interface PaginationProps {
  total: number;
  page: string | undefined;
}

const POSTS_PER_PAGE = 6;

export const Pagination = ({ total, page }: PaginationProps) => {
  const pageNumber = parsePage(page);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const LAST = Math.ceil(total / POSTS_PER_PAGE);
  const PREV = pageNumber >= 2;
  const NEXT = pageNumber < LAST;

  const handlePageChange = (type: "PREV" | "NEXT") => {
    const params = new URLSearchParams(searchParams);
    const path = pathname === "/" ? "/posts/" : pathname;

    let nextPage = 1;
    if (type === "PREV") {
      nextPage = Math.max(1, pageNumber - 1);
    } else if (type === "NEXT") {
      nextPage = Math.max(1, pageNumber + 1);
    }

    params.set("page", nextPage.toString());
    replace(`${path}?${params}`);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        aria-label="Previous page"
        className="hover:scale-105"
        disabled={!PREV}
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange("PREV")}
      >
        <ArrowLeftIcon width="22" height="22" />
      </Button>
      <p>
        Page <span className="font-bold">{pageNumber}</span> of{" "}
        <span className="font-bold">{LAST}</span>
      </p>
      <Button
        aria-label="Next page"
        className="hover:scale-105"
        disabled={!NEXT}
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange("NEXT")}
      >
        <ArrowRightIcon width="22" height="22" />
      </Button>
    </div>
  );
};
