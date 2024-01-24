import { renderHook } from '@testing-library/react-hooks';
import { useWebSocket } from 'hooks/useWebSocket'; // Adjust the import path as needed
import { useStock } from 'hooks/useStock'; // Adjust the import path as needed
import { WebSocketState } from 'types';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('hooks/useWebSocket', () => {
  return {
    useWebSocket: vi.fn(),
  };
});

describe('useStock', () => {
  // Mock the useWebSocket hook
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    vi.mocked(useWebSocket).mockReturnValue({
      stocks: [],
      subscribe: vi.fn(),
      isDuplicate: false,
      webSocketState: WebSocketState.Open,
      value: '',
    });
  });

  // it('validates ISIN code', () => {
  //   const { result } = renderHook(() => useStock());
  //   act(() => {
  //     // Manipulate the value to simulate user input
  //     result.current.setValue('InvalidISIN');
  //   });
  //   expect(result.current.error).toBe('Invalid ISIN code');
  // });
  //
  // it('handles subscription with valid ISIN code', () => {
  //   const { result } = renderHook(() => useStock());
  //   act(() => {
  //     result.current.setValue('ValidISIN123');
  //     result.current.onSubscribe({ preventDefault: vi.fn() });
  //   });
  //   expect(useWebSocket().subscribe).toHaveBeenCalledWith('ValidISIN123');
  // });

  it('handles connection states', () => {
    vi.mocked(useWebSocket).mockReturnValueOnce({
      ...useWebSocket(),
      webSocketState: WebSocketState.Connecting,
    });
    const { result } = renderHook(() => useStock());
    expect(result.current.isConnected).toBe(false);
    expect(result.current.isConnecting).toBe(true);
  });

  // Add more tests as needed...
});
