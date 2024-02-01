import { useEffect, useRef, useState } from 'react';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Stock, SubscriptionType, WebSocketState } from 'types';

const WS_ENDPOINT = import.meta.env.VITE_WS_ENDPOINT as string;

export const useWebSocket = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [value, setValue] = useState('');
  const [webSocketState, setWebSocketState] = useState<WebSocketState>(
    WebSocketState.Open,
  );
  const webSocketSubjectRef = useRef<WebSocketSubject<Stock> | null>(null);

  const updateWatchList = (stockData: Stock) => {
    setStocks((prev) => {
      // Check if Stocks already exists in watch list.
      const stockIndex = prev.findIndex((item) => item.isin === stockData.isin);
      if (stockIndex !== -1) {
        // Update price if Stocks already exists in watch list.
        const newList = [...prev];
        newList[stockIndex].price = stockData.price;
        return newList;
      } else {
        setValue('');
        // Using a stack approach to display new Stocks at the top of the list.
        return [stockData, ...prev];
      }
    });
  };

  const manageSubscription = (
    isin: string,
    mode: string = SubscriptionType.Subscribe,
  ) => {
    const webSocketSubject = webSocketSubjectRef.current;
    if (!webSocketSubject || webSocketSubject.closed) return;

    // @ts-expect-error Object is possibly 'undefined'.
    webSocketSubject.next({ [mode]: isin });

    if (mode === SubscriptionType.Unsubscribe) {
      setStocks((prev) => prev.filter((item) => item.isin !== isin));
    }
  };

  useEffect(() => {
    const webSocketSubject: WebSocketSubject<Stock> = webSocket(WS_ENDPOINT);
    webSocketSubjectRef.current = webSocketSubject;
    webSocketSubject.subscribe({
      next: (event: Stock) => updateWatchList(event),
      error: () => setWebSocketState(WebSocketState.Closed),
      complete: () => setWebSocketState(WebSocketState.Closed),
    });

    return () => {
      webSocketSubject.unsubscribe();
      webSocketSubjectRef.current = null;
      setWebSocketState(WebSocketState.Closed);
    };
  }, []);

  const isDuplicate = stocks.some(
    (item) => item.isin.toLowerCase() === value.toLowerCase(),
  );

  const webSocketSubject = webSocketSubjectRef.current;

  const reconnect = () => {
    if (!webSocketSubject || webSocketSubject.closed) {
      window.location.reload();
      return;
    }
    setWebSocketState(WebSocketState.Connecting);
    setTimeout(() => {
      setWebSocketState(WebSocketState.Open);
      webSocketSubject.subscribe({
        next: (event: Stock) => updateWatchList(event),
        error: () => setWebSocketState(WebSocketState.Closed),
        complete: () => setWebSocketState(WebSocketState.Closed),
      });

      //   Resubscribe to all stocks in watch list.
      stocks.forEach((item) => {
        // @ts-expect-error Object is possibly 'undefined'.
        webSocketSubject.next({ subscribe: item.isin });
      });
    }, 5000);
  };

  const isReload = !webSocketSubject || webSocketSubject.closed;

  return {
    stocks,
    webSocketState,
    subscribe: (isin: string) =>
      manageSubscription(isin, SubscriptionType.Subscribe),
    unsubscribe: (isin: string) =>
      manageSubscription(isin, SubscriptionType.Unsubscribe),
    setValue,
    value,
    isDuplicate,
    reconnect,
    isReload,
  };
};
