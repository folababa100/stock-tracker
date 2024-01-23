import React, { useState, useEffect } from 'react';
import Button from 'components/Button';
import { FaRegBellSlash } from "react-icons/fa";

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
        title={`Unsubscribe from ${isin}`}
        aria-label={`Unsubscribe from ${isin}`}
      >
        <FaRegBellSlash size={20} />
        <span className="ml-2 hidden-xs">Unsubscribe</span>
      </Button>
    </div>
  );
}

export default Item;
