import TextField from '.';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('TextField Component', () => {
  const mockOnChange = vi.fn();
  const props = {
    value: 'Test Value',
    label: 'Test Label',
    id: 'test-field',
    placeholder: 'Enter text',
    maxlength: 50,
    onChange: mockOnChange,
  };

  it('renders correctly with all props', () => {
    render(<TextField {...props} />);
    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(props.placeholder)).toBeInTheDocument();
  });

  it('associates the label with the input field', () => {
    render(<TextField {...props} />);
    expect(screen.getByLabelText(props.label)).toHaveAttribute('id', props.id);
  });

  it('displays the correct value', () => {
    render(<TextField {...props} />);
    expect(screen.getByLabelText(props.label)).toHaveValue(props.value);
  });

  it('calls onChange with the correct value', () => {
    render(<TextField {...props} />);
    const input = screen.getByLabelText(props.label);
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalledWith('New Value');
  });

  it('sets the maxlength if provided', () => {
    render(<TextField {...props} />);
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      'maxLength',
      props.maxlength.toString(),
    );
  });
});
