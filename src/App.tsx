import React, {FormEvent} from 'react';
import Header from 'components/Header';
import TextField from 'components/TextField';
import Button from 'components/Button';
import useWebSocket from './hooks/useWebSocket';
import {FaRegBell} from "react-icons/fa";

import './App.css';
import './styles/utility.scss';
// import Alert from './components/ui/Alert';
import Stocks from 'components/stock/List';
import useTheme from './hooks/useTheme.ts';

const ISIN_LENGTH = 12;
const ISIN_REGEX = new RegExp(/[a-zA-Z]{2}[a-zA-Z0-9]{9}\d/);

const App: React.FC = () => {
  const {theme, toggleTheme} = useTheme();
  const {
    value,
    setValue,
    watchList,
    isWebSocketConnected,
    subscribe,
    unsubscribe,
    isDuplicate,
  } = useWebSocket();

  const isISINValid = value.length === ISIN_LENGTH && ISIN_REGEX.test(value);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    subscribe(value);
  }

  return (
    <div id="app">
      <Header toggleTheme={toggleTheme} theme={theme}/>
      <main className="container">
        <h1>Stock tracker</h1>
        <p>
          Get the latest updates on the stocks you are interested in.
        </p>
        <p>
          Enter the ISIN code of the stock you want to track and click subscribe.
          <br/>
          Example: US0378331005
        </p>
        <form onSubmit={onSubscribe} className="mt-4 mb-4 form-card">
          <div className="flex flex-align-end gap-20">
            <TextField
              placeholder="XXXXXXXXXXXX"
              id="isin_text_field"
              value={value}
              onChange={setValue}
              maxlength={ISIN_LENGTH}
              label="ISIN code"
            />
            <Button
              type="submit"
              title="Subscribe"
              disabled={!isISINValid || !isWebSocketConnected || isDuplicate}
            >
              <FaRegBell size={20} />
              <span className="ml-2 hidden-xs">Subscribe</span>
            </Button>
          </div>
          {isDuplicate && (
            <p className="error-text text-center">You have already subscribed to this ISIN code</p>
          )}
        </form>
        <Stocks watchList={watchList} unsubscribe={unsubscribe}/>
      </main>
    </div>
  );
};

export default App;
