export interface Stock {
  isin: string;
  price: number;
}

export enum SubscriptionType {
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
}

export enum WebSocketState {
  Connecting = 0,
  Open = 1,
  Closed = 2,
}
