import { useCallback, useEffect, useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 5;
export const usePagination = (totalItems: number) => {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / ITEMS_PER_PAGE);
  }, [totalItems]);

  const setCurrentPage = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, totalPages));
      setPage(newPage);
    },
    [totalPages],
  );

  const nextPage = () => {
    setCurrentPage(page + 1);
  };

  const prevPage = () => {
    setCurrentPage(page - 1);
  };

  useEffect(() => {
    // Check if there are no items to display on the current page.
    if (totalItems > 0 && page > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalItems, page, totalPages, setCurrentPage]);

  const startItem = (page - 1) * ITEMS_PER_PAGE;
  const endItem = startItem + ITEMS_PER_PAGE;

  return {
    page,
    setPage: setCurrentPage,
    nextPage,
    prevPage,
    totalPages,
    startItem,
    endItem,
    items: ITEMS_PER_PAGE,
  };
};
