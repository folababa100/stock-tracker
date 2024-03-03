import React from 'react';
import Pagination from 'components/Pagination';
import Item from '../Item';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegSmile } from 'react-icons/fa';
import { usePagination } from 'hooks';

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
  const stocksLength = stocks.length;

  const { items, page, nextPage, prevPage, startItem, endItem } =
    usePagination(stocksLength);

  const currentStocks = stocks.slice(startItem, endItem);

  return (
    <div>
      {stocksLength === 0 && (
        <div className="text-center">
          <FaRegSmile data-testid="FaRegSmile" size={35} />
          <p className="mt-2">You are not tracking any stocks yet.</p>
        </div>
      )}
      <AnimatePresence mode="popLayout">
        {currentStocks.map(({ isin, price }, index) => (
          <motion.div
            data-testid="Item"
            key={isin}
            layout
            initial={{ opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Item
              currentIndex={(page - 1) * items + index + 1}
              isin={isin}
              price={price}
              unsubscribe={() => unsubscribe(isin)}
              isConnected={isConnected}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {stocksLength > items && (
        <Pagination
          prevPage={prevPage}
          page={page}
          nextPage={nextPage}
          stocksLength={stocksLength}
          items={items}
        />
      )}
    </div>
  );
};

export default List;
