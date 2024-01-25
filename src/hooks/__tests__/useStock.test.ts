import { renderHook } from '@testing-library/react';
import { useWebSocket } from 'hooks/useWebSocket';
import { useStock } from 'hooks/useStock';
import { WebSocketState } from 'types';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('hooks/useWebSocket', () => {
  return {
    useWebSocket: vi.fn(),
  };
});

describe('useStock', () => {
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

  it('handles connection states', () => {
    vi.mocked(useWebSocket).mockReturnValueOnce({
      ...useWebSocket(),
      webSocketState: WebSocketState.Connecting,
    });
    const { result } = renderHook(() => useStock());
    expect(result.current.isConnected).toBe(false);
    expect(result.current.isConnecting).toBe(true);
  });
});
