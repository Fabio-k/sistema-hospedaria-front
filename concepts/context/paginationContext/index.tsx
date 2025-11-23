"use client";
import { createContext, useContext, useState } from "react";

interface PaginationContextValue {
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
  setTotalCount: (totalCount: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  hasNextPage: boolean;
  setHasNextPage: (hasNextPage: boolean) => void;
  hasPreviousPage: boolean;
  setHasPreviousPage: (hasPreviousPage: boolean) => void;
  fillData: (data: any) => void;
  getDisplayPages: () => number[];
}

const paginationContext = createContext<PaginationContextValue | undefined>(
  undefined
);

export default function usePagination() {
  const ctx = useContext(paginationContext);
  if (!ctx) throw new Error("useFiltro must be used within FiltroProvider");
  return ctx;
}

export function PaginationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  function fillData(data: any) {
    setPage(data.page);
    setTotalCount(data.totalElementos);
    setHasNextPage(data.hasNext);
    setHasPreviousPage(data.hasPrevious);
    setTotalPages(data.totalPages);
  }

  function getDisplayPages(): number[] {
    const startPage = Math.max(page - 2, 1);
    const endPage = Math.min(page + 2, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => i + startPage
    );
  }

  return (
    <paginationContext.Provider
      value={{
        page,
        setPage,
        totalCount,
        setTotalCount,
        hasNextPage,
        setHasNextPage,
        hasPreviousPage,
        setHasPreviousPage,
        fillData,
        totalPages,
        setTotalPages,
        getDisplayPages,
      }}
    >
      {children}
    </paginationContext.Provider>
  );
}
