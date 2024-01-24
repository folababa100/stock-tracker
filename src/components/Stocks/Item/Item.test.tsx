import Item from 'components/Stocks/Item';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Item Component', () => {
  const mockUnsubscribe = vi.fn();
  const props = {
    isin: 'TEST123',
    price: 100,
    unsubscribe: mockUnsubscribe,
    isConnected: true,
  };

  // it('renders correctly with props', () => {
  //   render(<Item {...props} />);
  //   expect(screen.getByText(props.isin)).toBeInTheDocument();
  // expect(screen.getByText(props.price)).toBeInTheDocument();
  // });

  it('displays the ISIN and price', () => {
    render(<Item {...props} />);
    expect(screen.getByText('ISIN')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
  });

  it('renders unsubscribe button correctly', () => {
    render(<Item {...props} />);
    const unsubscribeButton = screen.getByRole('button', {
      name: `Unsubscribe from ${props.isin}`,
    });
    expect(unsubscribeButton).toBeInTheDocument();
    expect(unsubscribeButton).not.toBeDisabled();
  });

  it('disables unsubscribe button when not connected', () => {
    render(<Item {...props} isConnected={false} />);
    const unsubscribeButton = screen.getByRole('button', {
      name: `Unsubscribe from ${props.isin}`,
    });
    expect(unsubscribeButton).toBeDisabled();
  });

  it('calls unsubscribe function when button is clicked', () => {
    render(<Item {...props} />);
    const unsubscribeButton = screen.getByRole('button', {
      name: `Unsubscribe from ${props.isin}`,
    });
    fireEvent.click(unsubscribeButton);
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  // it('applies custom class name', () => {
  //   const customClass = 'custom-class';
  //   render(<Item {...props} className={customClass} />);
  //   expect(screen.getByText(props.isin).closest('div')).toHaveClass(
  //     'stock__container',
  //   );
  //   expect(screen.getByText(props.isin).closest('div')).toHaveClass(
  //     customClass,
  //   );
  // });
});
