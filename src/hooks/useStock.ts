import { useWebSocket } from 'hooks/useWebSocket.ts';

import { FormEvent } from 'react';
import { WebSocketState } from 'types';

const MAX_LENGTH = 12;
const REGEX = new RegExp(/[a-zA-Z]{2}[a-zA-Z0-9]{9}\d/);

export const useStock = () => {
  const { watchList, subscribe, isDuplicate, webSocketState, value, ...rest } =
    useWebSocket();

  // Check for invalid ISIN code with correct length
  const isInvalid = value.length === MAX_LENGTH && !REGEX.test(value);

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
    watchList,
    onSubscribe,
    maxLength: MAX_LENGTH,
    isConnected,
    isConnecting,
    error,
    value,
    ...rest,
  };
};
