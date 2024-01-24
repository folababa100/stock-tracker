import React from 'react';
import Button from 'components/Button';

import { FaRegBellSlash } from 'react-icons/fa';

import './Item.scss';

// Define the types for the props
interface ItemProps {
  isin: string;
  price: number;
  unsubscribe: () => void;
  className?: string;
  isConnected: boolean;
}

const Item: React.FC<ItemProps> = ({
  className,
  isin,
  price,
  unsubscribe,
  isConnected,
}) => {
  return (
    <div className={`stock__container ${className}`}>
      <div className="stock__data">
        {/*<div className="stock__data__item">*/}
        {/*  <div className="stock__isin">{isin}</div>*/}
        {/*  {price}*/}
        {/*</div>*/}
        <div>
          <div className="stock__data__item">
            <div className="stock__isin">ISIN</div>
            {isin}
          </div>
          <div className="stock__delimiter"></div>
          <div>
            <div className="stock__isin">Price</div>
            {price}
          </div>
        </div>
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
