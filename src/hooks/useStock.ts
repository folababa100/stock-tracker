import { FormEvent } from 'react';
import {useWebSocket} from 'hooks/useWebSocket.ts';

const ISIN_LENGTH = 12;
const ISIN_REGEX = new RegExp(/[a-zA-Z]{2}[a-zA-Z0-9]{9}\d/);

export const useStock = () => {
  const {
    value,
    setValue,
    watchList,
    isConnected,
    subscribe,
    unsubscribe,
    isDuplicate,
  } = useWebSocket();

  const isValid = value.length === ISIN_LENGTH && ISIN_REGEX.test(value);
  // Check for invalid ISIN code with correct length
  const isInvalid = value.length === ISIN_LENGTH && !ISIN_REGEX.test(value);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    subscribe(value);
  }

  return {
    value,
    setValue,
    watchList,
    isConnected,
    isValid,
    isInvalid,
    isDuplicate,
    onSubscribe,
    unsubscribe,
    maxLength: ISIN_LENGTH,
  }
}
