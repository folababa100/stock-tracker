// import { act, renderHook } from '@testing-library/react-hooks';
// import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
// import { useStock, useWebSocket } from 'hooks';
//
// // Mock the useWebSocket hook
// vi.mock('hooks', () => {
//   const originalModule = vi.importActual('hooks');
//   return {
//     ...originalModule,
//     useWebSocket: vi.fn(),
//     useStock: vi.fn(),
//   };
// });
//
// describe('useStock', () => {
//   let mockWebSocket: {
//     subscribe: any;
//     watchList?: never[];
//     unsubscribe?: Mock<any, any>;
//     reconnect?: Mock<any, any>;
//     setValue?: Mock<any, any>;
//     value?: string;
//     isDuplicate?: boolean;
//     webSocketState?: null;
//     isReload?: boolean;
//   };
//
//   beforeEach(() => {
//     // Reset the mock and define default behavior for each test
//     mockWebSocket = {
//       watchList: [],
//       subscribe: vi.fn(),
//       unsubscribe: vi.fn(),
//       reconnect: vi.fn(),
//       setValue: vi.fn(),
//       value: '',
//       isDuplicate: false,
//       webSocketState: null,
//       isReload: false,
//     };
//     useWebSocket.mockReturnValue(mockWebSocket);
//   });
//
//   it('initializes with default states', () => {
//     // Render the hook
//     const { result } = renderHook(() => useStock());
//
//     // Assert initial state values
//     expect(result.current.value).toBe('');
//     expect(result.current.watchList).toEqual([]);
//     expect(result.current.isConnected).toBe(false);
//     expect(result.current.isConnecting).toBe(false);
//     // Add more assertions as needed
//   });
//
//   it('handles subscription correctly', () => {
//     const { result } = renderHook(() => useStock());
//     act(() => {
//       result.current.setValue('validISIN');
//       result.current.onSubscribe({ preventDefault: vi.fn() });
//     });
//
//     // Assert the subscribe method was called with the correct value
//     expect(mockWebSocket.subscribe).toHaveBeenCalledWith('validISIN');
//   });
//
//   // Additional tests for other functionalities
// });
