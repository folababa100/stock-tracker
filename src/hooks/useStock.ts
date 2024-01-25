import { useWebSocket } from 'hooks/useWebSocket.ts';

import { FormEvent } from 'react';
import { WebSocketState } from 'types';

const MAX_LENGTH = 12;
const REGEX = new RegExp(/[a-zA-Z]{2}[a-zA-Z0-9]{9}\d/);

export const useStock = () => {
  const { stocks, subscribe, isDuplicate, webSocketState, value, ...rest } =
    useWebSocket();

  const isInvalid = value.length === MAX_LENGTH && !REGEX.test(value);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    subscribe(value);
  };

  const isConnected = webSocketState === WebSocketState.Open;
  const isConnecting = webSocketState === WebSocketState.Connecting;

  let error = '';
  if (isInvalid) {
    error = 'Incorrect ISIN code. Please try again.';
  } else if (isDuplicate) {
    error = 'Already subscribed, please try another ISIN code.';
  } else if (!isConnected) {
    error = 'Please reconnect to track your stocks.';
  }

  return {
    stocks,
    onSubscribe,
    maxLength: MAX_LENGTH,
    isConnected,
    isConnecting,
    error,
    value,
    ...rest,
  };
};
