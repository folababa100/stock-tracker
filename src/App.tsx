import React from 'react';
import Header from './components/ui/Header';
import TextField from './components/ui/TextField';
import Button from './components/ui/Button';
import useWebSocket from './hooks/useWebSocket';

import './App.css';
import './styles/utility.scss';
// import Alert from './components/ui/Alert';
import Stocks from './components/stock/List';
import useTheme from './hooks/useTheme.ts';

const ISIN_LENGTH = 12;
const ISIN_REGEX = new RegExp(/[a-zA-Z]{2}[a-zA-Z0-9]{9}\d/);

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    value,
    setValue,
    watchList,
    isWebSocketConnected,
    subscribe,
    unsubscribe,
  } = useWebSocket();

  const isISINValid = value.length === ISIN_LENGTH && ISIN_REGEX.test(value);

  const onSubscribe = () => {
    subscribe(value);
  }

  return (
    <div id="app">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="container">
        <h1 className="page_title">Search for assets</h1>
        <p className="helper-text">
          Welcome to my mini stocks monitoring app!
          <br/>
          Here you can search and subscribe to the updates of the stocks of your
          interest.
        </p>
        <p className="helper-text">
          The rules are simple: type an ISIN of an asset you want to add to your
          watch list to the input below and press "Subscribe"
        </p>
        <div className="flex mt-4 mb-4 flex-align-end gap-20">
          <TextField
            placeholder="XXXXXXXXXXXX"
            id="isin_text_field"
            value={value}
            onChange={setValue}
            maxlength={ISIN_LENGTH}
            label="ISIN code"
            // onKeyUp={(value) => manageSubscription(value)}
          />
          <Button
            disabled={!isISINValid || !isWebSocketConnected}
            onClick={onSubscribe}
          >
            Subscribe
          </Button>
        </div>
        <Stocks watchList={watchList} unsubscribe={unsubscribe}/>
      </main>
    </div>
  );
};

export default App;
