import React from 'react';
import Header from 'components/Header';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Stocks from 'components/stock/List';
import Alert from 'components/Alert';

import { useStock, useTheme } from 'hooks';
import { FaRegBell } from 'react-icons/fa';

import './App.css';
import './styles/utility.scss';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    value,
    setValue,
    watchList,
    error,
    onSubscribe,
    unsubscribe,
    maxLength,
    reconnect,
    isConnected,
    isConnecting,
    isReload,
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
              disabled={!!error || value.length === 0 || !isConnected}
            >
              <FaRegBell size={20} />
              <span className="ml-2 hidden-xs">Subscribe</span>
            </Button>
          </div>
          {error && <p className="error-text">{error}</p>}
        </form>
        <Alert show={!isConnected} type="warning">
          {isConnecting
            ? 'Connecting...'
            : 'You are not connected to the server.'}
          <Button
            variant="secondary"
            className="btn-sm mt-2"
            onClick={() => reconnect()}
            disabled={isConnecting}
          >
            {isReload ? 'Reload' : 'Reconnect'}
          </Button>
        </Alert>
        <Stocks watchList={watchList} unsubscribe={unsubscribe} />
      </main>
    </div>
  );
};

export default App;
