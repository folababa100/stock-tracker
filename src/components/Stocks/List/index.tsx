import React from 'react';
import Pagination from 'components/Pagination';
import Item from '../Item';

import { FaRegSmile } from 'react-icons/fa';
import { usePagination } from 'hooks';
import './List.scss';

interface Subscription {
  isin: string;
  price: number;
}

interface ListProps {
  stocks: Subscription[];
  unsubscribe: (isin: string) => void;
  isConnected: boolean;
}

const List: React.FC<ListProps> = ({ stocks, unsubscribe, isConnected }) => {
  const watchLength = stocks.length;

  const { items, page, nextPage, prevPage, startItem, endItem } =
    usePagination(watchLength);

  const currentStocks = stocks.slice(startItem, endItem);
  return (
    <div>
      {watchLength === 0 && (
        <div className="text-center">
          <FaRegSmile data-testid="FaRegSmile" size={35} />
          <p className="mt-2">You are not tracking any stocks yet.</p>
        </div>
      )}
      {currentStocks.map(({ isin, price }, index) => (
        <div data-testid="Item" key={isin}>
          <Item
            currentIndex={(page - 1) * items + index + 1}
            key={isin}
            isin={isin}
            price={price}
            unsubscribe={() => unsubscribe(isin)}
            isConnected={isConnected}
          />
        </div>
      ))}

      {watchLength > items && (
        <Pagination
          prevPage={prevPage}
          page={page}
          nextPage={nextPage}
          watchLength={watchLength}
          items={items}
        />
      )}
    </div>
  );
};

export default List;
