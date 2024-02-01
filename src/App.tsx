import React from 'react';
import Header from 'components/Header';
import Stocks from 'components/Stocks/List';
import Alert from 'components/Alert';
import Form from 'components/Form';

import { useStock, useTheme } from 'hooks';

import './styles/normalize.css';
import './App.css';
import './styles/utility.scss';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const {
    value,
    setValue,
    stocks,
    error,
    onSubscribe,
    unsubscribe,
    maxLength,
    reconnect,
    isConnected,
    isConnecting,
  } = useStock();

  return (
    <div id="app">
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
          Example: DE000BASF111
        </p>
        <Form
          value={value}
          setValue={setValue}
          onSubmit={onSubscribe}
          error={error}
          maxLength={maxLength}
          isConnected={isConnected}
        />
        <Alert
          show={!isConnected}
          onClick={() => reconnect()}
          isConnecting={isConnecting}
        />
        <Stocks
          stocks={stocks}
          unsubscribe={unsubscribe}
          isConnected={isConnected}
        />
      </main>
    </div>
  );
};

export default App;
