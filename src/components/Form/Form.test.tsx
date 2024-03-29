import Form from '.';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Form Component', () => {
  const mockSetValue = vi.fn();
  const mockOnSubscribe = vi.fn();
  const props = {
    value: '',
    setValue: mockSetValue,
    onSubmit: mockOnSubscribe,
    error: '',
    maxLength: 12,
    isConnected: true,
  };

  it('renders correctly with props', () => {
    render(<Form {...props} />);
    expect(screen.getByPlaceholderText('Enter ISIN')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /subscribe/i }),
    ).toBeInTheDocument();
  });

  it('disables the button when not connected or error is present or value length is incorrect', () => {
    const errorProps = {
      ...props,
      error: 'Error message',
      isConnected: false,
      value: '123',
    };
    render(<Form {...errorProps} />);
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeDisabled();
  });

  it('updates value on TextField change', () => {
    render(<Form {...props} />);
    const input = screen.getByPlaceholderText('Enter ISIN');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(mockSetValue).toHaveBeenCalledWith('New Value');
  });

  it('calls onSubmit on form submission', () => {
    render(<Form {...props} value="DE000BASF111" />);
    const form = screen.getByTestId('form');
    fireEvent.submit(form);
    expect(mockOnSubscribe).toHaveBeenCalled();
  });

  it('displays error message when there is an error', () => {
    const errorProps = { ...props, error: 'Error message' };
    render(<Form {...errorProps} />);
    expect(screen.getByText(errorProps.error)).toBeInTheDocument();
  });
});
