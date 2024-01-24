import { act, renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTheme } from 'hooks';

// Mocking localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
    clear: (): void => {
      store = {};
    },
  };
})();

// Mocking matchMedia
const mockMatchMedia = (matches: boolean): void => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
};

describe('useTheme', () => {
  beforeEach(() => {
    // Set up our mocks before each test
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    Object.defineProperty(document.body, 'className', {
      writable: true,
      value: '',
    });
  });

  afterEach(() => {
    // Clear mocks after each test
    localStorageMock.clear();
    vi.restoreAllMocks();
  });

  it('initializes theme based on localStorage', () => {
    localStorageMock.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  it('toggles theme correctly', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.body.className).toBe('dark');
  });

  it('updates theme based on system preference', () => {
    mockMatchMedia(true); // Simulating system preference for dark mode
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  // Additional tests can be added as needed
});
