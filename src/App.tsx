import React from 'react';
import Header from 'components/Header';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Stocks from 'components/stock/List';

import { useStock, useTheme } from 'hooks';
import { FaRegBell } from 'react-icons/fa';

import './App.css';
import './styles/utility.scss';
// import Alert from './components/ui/Alert';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    isValid,
    isInvalid,
    isConnected,
    isDuplicate,
    value,
    setValue,
    onSubscribe,
    unsubscribe,
    maxLength,
    watchList,
  } = useStock();

  return (
    <div id="app">
      {/* Skip link */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main id="main" className="container">
        <h1>My stock tracker.</h1>
        <p>Get the latest updates on the stocks you are interested in.</p>
        <p>
          Enter the ISIN code of the stock you want to track and click
          subscribe.
          <br />
          Example: US0378331005
        </p>
        <form onSubmit={onSubscribe} className="mt-4 mb-4 form-card">
          <div className="flex flex-align-end gap-20">
            <TextField
              placeholder="XXXXXXXXXXXX"
              id="isin_text_field"
              value={value}
              onChange={setValue}
              maxlength={maxLength}
              label="ISIN code"
            />
            <Button
              type="submit"
              title="Subscribe"
              disabled={!isValid || !isConnected || isDuplicate}
            >
              <FaRegBell size={20} />
              <span className="ml-2 hidden-xs">Subscribe</span>
            </Button>
          </div>
          {isDuplicate ? (
            <p className="error-text text-center">
              You have already subscribed to this ISIN code
            </p>
          ) : isInvalid ? (
            <p className="error-text text-center">
              Please enter a valid ISIN code
            </p>
          ) : null}
        </form>
        <Stocks watchList={watchList} unsubscribe={unsubscribe} />
      </main>
    </div>
  );
};

export default App;
