import { vi } from 'vitest';
import '@testing-library/jest-dom'; // MatchMedia Mock

// MatchMedia Mock
const global: Window = window;
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  };
