import { useWebSocket } from 'hooks/useWebSocket.ts';

import { FormEvent } from 'react';
import { WebSocketState } from 'types';

const ISIN_LENGTH = 12;
const ISIN_REGEX = new RegExp(/[a-zA-Z]{2}[a-zA-Z0-9]{9}\d/);

export const useStock = () => {
  const {
    watchList,
    subscribe,
    unsubscribe,
    reconnect,
    setValue,
    value,
    isDuplicate,
    webSocketState,
    isReload,
  } = useWebSocket();

  // Check for invalid ISIN code with correct length
  const isInvalid = value.length === ISIN_LENGTH && !ISIN_REGEX.test(value);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    subscribe(value);
  };

  const isConnected = webSocketState === WebSocketState.Open;
  const isConnecting = webSocketState === WebSocketState.Connecting;

  const error = isInvalid
    ? 'Invalid ISIN code'
    : isDuplicate
      ? 'Duplicate ISIN code'
      : '';

  return {
    value,
    setValue,
    watchList,
    onSubscribe,
    unsubscribe,
    maxLength: ISIN_LENGTH,
    reconnect,
    isConnected,
    isConnecting,
    error,
    isReload,
  };
};
