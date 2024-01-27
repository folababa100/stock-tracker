import Pagination from '.';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Pagination Component', () => {
  const mockPrevPage = vi.fn();
  const mockNextPage = vi.fn();

  it('renders the current page number', () => {
    render(
      <Pagination
        prevPage={mockPrevPage}
        page={3}
        nextPage={mockNextPage}
        stocksLength={100}
        items={10}
      />,
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders the Prev and Next buttons', () => {
    render(
      <Pagination
        prevPage={mockPrevPage}
        page={1}
        nextPage={mockNextPage}
        stocksLength={100}
        items={10}
      />,
    );
    expect(screen.getByTitle('Previous page')).toBeInTheDocument();
    expect(screen.getByTitle('Next page')).toBeInTheDocument();
  });

  it('disables Prev button on the first page', () => {
    render(
      <Pagination
        prevPage={mockPrevPage}
        page={1}
        nextPage={mockNextPage}
        stocksLength={100}
        items={10}
      />,
    );
    expect(screen.getByTitle('Previous page')).toBeDisabled();
  });

  it('enables Prev button on pages after the first', () => {
    render(
      <Pagination
        prevPage={mockPrevPage}
        page={2}
        nextPage={mockNextPage}
        stocksLength={100}
        items={10}
      />,
    );
    expect(screen.getByTitle('Previous page')).toBeEnabled();
  });

  it('disables Next button on the last page', () => {
    render(
      <Pagination
        prevPage={mockPrevPage}
        page={10}
        nextPage={mockNextPage}
        stocksLength={100}
        items={10}
      />,
    );
    expect(screen.getByTitle('Next page')).toBeDisabled();
  });

  it('enables Next button on pages before the last', () => {
    render(
      <Pagination
        prevPage={mockPrevPage}
        page={9}
        nextPage={mockNextPage}
        stocksLength={100}
        items={10}
      />,
    );
    expect(screen.getByTitle('Next page')).toBeEnabled();
  });

  it('calls prevPage when Prev button is clicked', () => {
    render(
      <Pagination
        prevPage={mockPrevPage}
        page={2}
        nextPage={mockNextPage}
        stocksLength={100}
        items={10}
      />,
    );
    fireEvent.click(screen.getByTitle('Previous page'));
    expect(mockPrevPage).toHaveBeenCalled();
  });

  it('calls nextPage when Next button is clicked', () => {
    render(
      <Pagination
        prevPage={mockPrevPage}
        page={1}
        nextPage={mockNextPage}
        stocksLength={100}
        items={10}
      />,
    );
    fireEvent.click(screen.getByTitle('Next page'));
    expect(mockNextPage).toHaveBeenCalled();
  });
});
