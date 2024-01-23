import { useState, useEffect, useRef, useCallback } from 'react';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const WS_ENDPOINT = import.meta.env.VITE_WS_ENDPOINT as string;

// Interface for a stock, including its ISIN and price.
export interface Stock {
  isin: string;
  price: number;
}

enum SubscriptionType {
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
}

const useWebSocket = () => {
  const [watchList, setWatchList] = useState<Stock[]>([]);
  const [value, setValue] = useState('');
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(true);
  const webSocketSubjectRef = useRef<WebSocketSubject<any> | null>(null);

  // Updates watch list with new stock data or adds new stocks.
  const updateWatchList = (stockData: Stock) => {
    setWatchList((prev) => {
      const stockIndex = prev.findIndex(item => item.isin === stockData.isin);
      if (stockIndex !== -1) {
        // Update price if stock already exists in watch list.
        const newList = [...prev];
        newList[stockIndex].price = stockData.price;
        return newList;
      } else {
        // Add new stock to watch list if it doesn't exist.
        setValue('');
        return [...prev, stockData];
      }
    });
  };

  // Subscribes or unsubscribes from a stock's updates.
  const manageSubscription = (isin: string, mode: string = SubscriptionType.Subscribe) => {
    const webSocketSubject = webSocketSubjectRef.current;
    if (!webSocketSubject || webSocketSubject.closed) return;

    webSocketSubject.next({ [mode]: isin });

    if (mode === SubscriptionType.Unsubscribe) {
      setWatchList(prev => prev.filter(item => item.isin !== isin));
    }
  };

  const closeConnection = useCallback(() => {
    const webSocketSubject = webSocketSubjectRef.current;
    if (!webSocketSubject || webSocketSubject.closed) return;
    webSocketSubject.unsubscribe();
    webSocketSubjectRef.current = null;
    setIsWebSocketConnected(false);
  }, []);

  useEffect(() => {
    // Setting up WebSocket subject to handle data, errors, and connection closure.
    const webSocketSubject: WebSocketSubject<any> = webSocket(WS_ENDPOINT);
    webSocketSubjectRef.current = webSocketSubject;
    webSocketSubject.subscribe({
      next: (event: Stock) => updateWatchList(event),
      error: () => setIsWebSocketConnected(false),
      complete: () => setIsWebSocketConnected(false),
    });

    return () => {
      // Unsubscribing from WebSocket subject on unmount.
      webSocketSubject.unsubscribe();
      webSocketSubjectRef.current = null;
      // setIsWebSocketConnected(false);
    };
  }, []);

  return {
    watchList,
    isWebSocketConnected,
    subscribe: (isin: string) => manageSubscription(isin, SubscriptionType.Subscribe),
    unsubscribe: (isin: string) => manageSubscription(isin, SubscriptionType.Unsubscribe),
    closeConnection,
    setValue,
    value,
  };
};

export default useWebSocket;
