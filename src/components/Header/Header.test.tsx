import Header from 'components/Header';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Header Component', () => {
  const mockToggleTheme = vi.fn();

  it('renders correctly', () => {
    render(<Header theme="light" toggleTheme={mockToggleTheme} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('contains the theme toggle button', () => {
    render(<Header theme="light" toggleTheme={mockToggleTheme} />);
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('displays the correct icon for light theme', () => {
    render(<Header theme="light" toggleTheme={mockToggleTheme} />);
    expect(screen.getByTestId('light-icon')).toBeInTheDocument();
  });

  it('displays the correct icon for dark theme', () => {
    render(<Header theme="dark" toggleTheme={mockToggleTheme} />);
    expect(screen.getByTestId('dark-icon')).toBeInTheDocument();
  });

  it('calls toggleTheme when the toggle button is clicked', () => {
    render(<Header theme="light" toggleTheme={mockToggleTheme} />);
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggleButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('changes the color of the SVG logo according to the theme', () => {
    const { rerender } = render(
      <Header theme="light" toggleTheme={mockToggleTheme} />,
    );
    expect(screen.getByTestId('light-icon')).toBeInTheDocument();
    rerender(<Header theme="dark" toggleTheme={mockToggleTheme} />);
    expect(screen.getByTestId('dark-icon')).toBeInTheDocument();
  });
});
