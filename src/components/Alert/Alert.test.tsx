import Alert from '.';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Alert Component', () => {
  const mockOnClick = vi.fn();

  it('renders when show is true', () => {
    render(<Alert show={true} onClick={mockOnClick} isConnecting={false} />);
    expect(
      screen.getByText(/Oops! Something went wrong./i),
    ).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    render(<Alert show={false} onClick={mockOnClick} isConnecting={false} />);
    expect(screen.queryByText(/Oops! Something went wrong./i)).toBeNull();
  });

  it('displays the correct message based on isConnecting prop', () => {
    const { rerender } = render(
      <Alert show={true} onClick={mockOnClick} isConnecting={true} />,
    );
    expect(screen.getByText(/Connecting.../i)).toBeInTheDocument();

    rerender(<Alert show={true} onClick={mockOnClick} isConnecting={false} />);
    expect(
      screen.getByText(/Oops! Something went wrong./i),
    ).toBeInTheDocument();
  });

  it('button is disabled when isConnecting is true', () => {
    render(<Alert show={true} onClick={mockOnClick} isConnecting={true} />);
    expect(screen.getByRole('button', { name: /reconnect/i })).toBeDisabled();
  });

  it('calls onClick when the button is clicked', () => {
    render(<Alert show={true} onClick={mockOnClick} isConnecting={false} />);
    fireEvent.click(screen.getByRole('button', { name: /reconnect/i }));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
