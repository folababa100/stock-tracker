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
  watchList: Subscription[];
  unsubscribe: (isin: string) => void;
  isConnected: boolean;
}

const List: React.FC<ListProps> = ({ watchList, unsubscribe, isConnected }) => {
  const watchLength = watchList.length;

  const { items, page, nextPage, prevPage, startItem, endItem } =
    usePagination(watchLength);

  const stocks = watchList.slice(startItem, endItem);
  return (
    <div>
      {watchLength === 0 && (
        <div className="text-center">
          <FaRegSmile data-testid="FaRegSmile" size={35} />
          <p className="mt-2">You are not tracking any stocks yet.</p>
        </div>
      )}
      {stocks.map(({ isin, price }) => (
        <div data-testid="Item">
          <Item
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
