import React from 'react';

import './Pagination.scss';

interface PaginationProps {
  prevPage: () => void;
  page: number;
  nextPage: () => void;
  stocksLength: number;
  items: number;
}

const Pagination: React.FC<PaginationProps> = ({
  prevPage,
  page,
  nextPage,
  stocksLength,
  items,
}) => {
  return (
    <div className="pagination" data-testid="Pagination">
      <button
        title="Previous page"
        className="pagination-button"
        onClick={prevPage}
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="pagination-current">{page}</span>
      <button
        title="Next page"
        className="pagination-button"
        onClick={nextPage}
        disabled={page === Math.ceil(stocksLength / items)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
