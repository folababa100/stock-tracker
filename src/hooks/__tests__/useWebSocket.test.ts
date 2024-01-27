import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { useWebSocket } from 'hooks';
import { Stock, WebSocketState } from 'types';

vi.mock('rxjs/webSocket', () => ({
  webSocket: vi.fn(),
}));

interface MockWebSocketSubject extends WebSocketSubject<Stock> {
  closed: boolean;
}

const createMockWebSocketSubject = (): MockWebSocketSubject => ({
  next: vi.fn(),
  // @ts-expect-error Object is possibly 'undefined'.
  subscribe: vi.fn(() => ({ unsubscribe: vi.fn() })),
  unsubscribe: vi.fn(),
  closed: false,
});

describe('useWebSocket', () => {
  let mockWebSocketSubject: MockWebSocketSubject;

  beforeEach(() => {
    mockWebSocketSubject = createMockWebSocketSubject();
    (webSocket as unknown as Mock).mockReturnValue(mockWebSocketSubject);
  });

  it('initializes correctly', () => {
    const { result } = renderHook(() => useWebSocket());
    expect(result.current.stocks).toEqual([]);
    expect(result.current.webSocketState).toBe(WebSocketState.Open);
  });

  it('subscribes to a Stocks', () => {
    const { result } = renderHook(() => useWebSocket());
    act(() => {
      result.current.subscribe('DE000BASF111');
    });

    expect(mockWebSocketSubject.next).toHaveBeenCalledWith({
      subscribe: 'DE000BASF111',
    });
  });

  it('unsubscribes from a Stocks', () => {
    const { result } = renderHook(() => useWebSocket());
    act(() => {
      result.current.unsubscribe('DE000BASF111');
    });

    expect(mockWebSocketSubject.next).toHaveBeenCalledWith({
      unsubscribe: 'DE000BASF111',
    });
  });
});
