import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import './Item.scss';

// Define the types for the props
interface ItemProps {
  isin: string;
  price: number;
  unsubscribe: () => void;
}

const Item: React.FC<ItemProps> = ({ isin, price, unsubscribe }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="stock__container">
      <div className="stock__data">
        {isMobile ? (
          <div className="stock__data__item">
            <div className="stock__isin">{isin}</div>
            {price}
          </div>
        ) : (
          <>
            <div className="stock__data__item">
              <div className="stock__isin">ISIN</div>
              {isin}
            </div>
            <div className="stock__delimiter"></div>
            <div>
              <div className="stock__isin">Price</div>
              {price}
            </div>
          </>
        )}
      </div>
      <Button
        onClick={unsubscribe}
        // appearance="secondary"
        // className="stock__button"
      >
        Unsubscribe
      </Button>
    </div>
  );
}

export default Item;
