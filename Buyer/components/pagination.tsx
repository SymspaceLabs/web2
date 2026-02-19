"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  count: number;
  page?: number;
  onChange?: (page: number) => void;
}

export default function CustomPagination({
  count,
  page = 1,
  onChange,
}: CustomPaginationProps) {
  const handlePage = (p: number) => {
    if (p < 1 || p > count) return;
    onChange?.(p);
  };

  const getPages = (): (number | "ellipsis-start" | "ellipsis-end")[] => {
    if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis-end", count];
    if (page >= count - 3) return [1, "ellipsis-start", count - 4, count - 3, count - 2, count - 1, count];
    return [1, "ellipsis-start", page - 1, page, page + 1, "ellipsis-end", count];
  };

  const isFirst = page === 1;
  const isLast = page === count;

  return (
    <Pagination className="mt-5 mb-3">
      <PaginationContent>

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePage(page - 1)}
            aria-disabled={isFirst}
            className={isFirst ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {/* Page numbers */}
        {getPages().map((p) =>
          p === "ellipsis-start" || p === "ellipsis-end" ? (
            <PaginationItem key={p}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => handlePage(p)}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePage(page + 1)}
            aria-disabled={isLast}
            className={isLast ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}