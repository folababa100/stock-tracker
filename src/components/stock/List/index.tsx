import React from 'react';
import Item from '../Item';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './List.scss';

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
      <TransitionGroup>
        {watchList.map(({ isin, price }, index) => (
          <CSSTransition
            key={`subscription-${isin}-${index}`}
            timeout={500}
            classNames="item"
          >
            <Item
              isin={isin}
              price={price}
              unsubscribe={() => unsubscribe(isin)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default List;
