export interface Stock {
  isin: string;
  price: number;
}

export enum SubscriptionType {
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
}

export type ButtonType = 'primary' | 'secondary' | 'danger';
export type AlertType = 'primary' | 'secondary' | 'danger';

export enum WebSocketState {
  Connecting = 0,
  Open = 1,
  Closed = 2,
}
