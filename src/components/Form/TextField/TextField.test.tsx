import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import TextField from '.';

describe('TextField Component', () => {
  const mockOnChange = vi.fn();

  it('renders with correct label and input', () => {
    render(
      <TextField
        label="Test Label"
        id="test"
        value=""
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('has correct attributes', () => {
    render(
      <TextField
        label="Test Label"
        id="test"
        value="Test Value"
        placeholder="Enter text"
        maxlength={20}
        onChange={mockOnChange}
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Test Value');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('maxLength', '20');
  });

  it('triggers onChange event', () => {
    render(
      <TextField
        label="Test Label"
        id="test"
        value=""
        onChange={mockOnChange}
      />,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('associates the label with the input field', () => {
    render(
      <TextField
        label="Test Label"
        id="test"
        value=""
        onChange={mockOnChange}
      />,
    );
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('id', 'test');
  });
});
