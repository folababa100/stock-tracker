import React from 'react';
import Button from 'components/Button';

import { FaRegBellSlash } from 'react-icons/fa';

import './Item.scss';

// Define the types for the props
interface ItemProps {
  isin: string;
  price: number;
  currentIndex: number;
  unsubscribe: () => void;
  isConnected: boolean;
}

const Item: React.FC<ItemProps> = ({
  isin,
  price,
  unsubscribe,
  isConnected,
  currentIndex,
}) => {
  return (
    <div className="StockItem">
      <div className="StockItem-data">
        <span className="StockItem-isin">
          {currentIndex}: {isin}
        </span>
        <span className="StockItem-price">
          {new Intl.NumberFormat('en-IE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(price)}
        </span>
      </div>
      <Button
        onClick={unsubscribe}
        title={`Unsubscribe from ${isin}`}
        aria-label={`Unsubscribe from ${isin}`}
        variant="secondary"
        disabled={!isConnected}
      >
        <FaRegBellSlash size={20} />
        <span className="ml-2 hidden-xs">Unsubscribe</span>
      </Button>
    </div>
  );
};

export default Item;
