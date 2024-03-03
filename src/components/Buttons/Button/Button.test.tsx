import Button from 'components/Buttons/Button/index.tsx';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ButtonType } from 'types.ts';

describe('Buttons Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('applies default variant class when no variant is provided', () => {
    render(<Button>Default</Button>);
    expect(screen.getByText('Default')).toHaveClass('btn-primary');
  });

  it.each(['primary', 'secondary', 'danger'])(
    'applies the correct class for %s variant',
    (variant) => {
      render(<Button variant={variant as ButtonType}>Button</Button>);
      expect(screen.getByText('Button')).toHaveClass(`btn-${variant}`);
    },
  );

  it('passes additional props to the button element', () => {
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies custom class name', () => {
    const customClass = 'custom-class';
    render(<Button className={customClass}>Button</Button>);
    expect(screen.getByText('Button')).toHaveClass(customClass);
  });
});
