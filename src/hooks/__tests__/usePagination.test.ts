import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePagination } from 'hooks/usePagination';

describe('usePagination', () => {
  it('initializes correctly', () => {
    const totalItems = 20;
    const { result } = renderHook(() => usePagination(totalItems));

    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(Math.ceil(totalItems / 5));
  });

  it('navigates to next and previous pages', () => {
    const { result } = renderHook(() => usePagination(20));

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.page).toBe(2);

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.page).toBe(1);
  });

  it('sets current page correctly', () => {
    const { result } = renderHook(() => usePagination(20));

    act(() => {
      result.current.setPage(3);
    });
    expect(result.current.page).toBe(3);
  });

  it('does not navigate beyond boundaries', () => {
    const { result } = renderHook(() => usePagination(20));

    act(() => {
      result.current.setPage(0);
    });
    expect(result.current.page).toBe(1);

    act(() => {
      result.current.setPage(5);
    });
    expect(result.current.page).toBe(4);
  });

  it('adjusts page if out of bounds due to item count change', () => {
    const { result, rerender } = renderHook(
      (props) => usePagination(props.totalItems),
      {
        initialProps: { totalItems: 20 },
      },
    );

    act(() => {
      result.current.setPage(4);
    });

    rerender({ totalItems: 10 });
    expect(result.current.page).toBe(2);
  });
});
