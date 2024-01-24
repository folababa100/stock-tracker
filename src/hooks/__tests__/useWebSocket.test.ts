// Ignore all typescript errors and wa

import { act, renderHook } from '@testing-library/react-hooks';
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
  asObservable: vi.fn(),
  lift: vi.fn(),
  error: vi.fn(),
  complete: vi.fn(),
});

describe('useWebSocket', () => {
  let mockWebSocketSubject: MockWebSocketSubject;

  beforeEach(() => {
    mockWebSocketSubject = createMockWebSocketSubject();
    (webSocket as unknown as Mock).mockReturnValue(mockWebSocketSubject);
  });

  it('initializes correctly', () => {
    const { result } = renderHook(() => useWebSocket());
    expect(result.current.watchList).toEqual([]);
    expect(result.current.webSocketState).toBe(WebSocketState.Open);
  });

  it('subscribes to a stock', () => {
    const { result } = renderHook(() => useWebSocket());
    act(() => {
      result.current.subscribe('testISIN');
    });

    expect(mockWebSocketSubject.next).toHaveBeenCalledWith({
      subscribe: 'testISIN',
    });
  });

  it('unsubscribes from a stock', () => {
    const { result } = renderHook(() => useWebSocket());
    act(() => {
      result.current.unsubscribe('testISIN');
    });

    expect(mockWebSocketSubject.next).toHaveBeenCalledWith({
      unsubscribe: 'testISIN',
    });
  });

  // Additional tests can be added as needed
});
