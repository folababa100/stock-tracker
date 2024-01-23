import React from 'react';
import Item from './Item'; // Adjust the import path as needed

// Define the types for the props
interface Subscription {
  isin: string;
  price: number;
}

interface ListProps {
  watchList: Subscription[];
  unsubscribe: (isin: string) => void;
}

const List: React.FC<ListProps> = ({ watchList, unsubscribe }) => {
  return (
    <div className="watch-list__items">
      {watchList.map(({ isin, price }, index) => (
        <Item
          key={`subscription-${isin}-${index}`}
          isin={isin}
          price={price}
          unsubscribe={() => unsubscribe(isin)}
        />
      ))}
    </div>
  );
};

export default List;
