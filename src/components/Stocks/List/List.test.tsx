import List from 'components/Stocks/List';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('List Component', () => {
  const mockUnsubscribe = vi.fn();

  it('displays a message and an icon when watchList is empty', () => {
    render(
      <List watchList={[]} unsubscribe={mockUnsubscribe} isConnected={true} />,
    );
    expect(
      screen.getByText(/You are not tracking any stocks yet./i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('FaRegSmile')).toBeInTheDocument();
  });

  it('renders Item components for each item in the watchList', () => {
    const watchList = [
      { isin: '123', price: 100 },
      { isin: '456', price: 200 },
    ];
    render(
      <List
        watchList={watchList}
        unsubscribe={mockUnsubscribe}
        isConnected={true}
      />,
    );
    expect(screen.getAllByTestId('Item')).toHaveLength(watchList.length);
  });

  it('renders Pagination when the list length is greater than items per page', () => {
    const watchList = new Array(6).fill(0).map((_, index) => ({
      isin: index.toString(),
      price: index * 100,
    }));
    render(
      <List
        watchList={watchList}
        unsubscribe={mockUnsubscribe}
        isConnected={true}
      />,
    );
    expect(screen.getByTestId('Pagination')).toBeInTheDocument();
  });
});
