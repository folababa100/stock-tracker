# My stock tracker.

### Intro & Context
This is my solution to the coding challenge. This App is a stock tracker that allows the user to subscribe to stocks and
see their real-time prices. The user can also unsubscribe from stocks and add new stocks to his watch list. The app
also has a dark mode and a light mode to improve the user experience. The app is responsive and can be used on mobile
devices as well.

## Initial Setup

### Environment setup

Please make sure to have [Node](https://nodejs.org/en/download) 18 up installed.


### Running the code

Nothing changes, you can run `yarn` or `npm install` to install dependencies.
After that, you can run:

```bash
# npm
npm run dev

# or yarn
yarn dev
```

This will start the application in development mode. It will also start the WebSocket server on port 8425.

You can see the client application running in your browser by going to http://localhost:8080.

---


---
## Documentation


### useWebSocket

The `useWebSocket` hook returns an object containing the following properties and methods:

### Properties

- `stocks`: An array of `Stock` objects. It represents the current state of stocks being tracked or monitored.
- `webSocketState`: Represents the current state of the WebSocket connection. It's of the type `WebSocketState`, indicating states like Open, Closed, or Connecting.
- `value`: A string value, presumably used for tracking input or filter values in the context where the hook is used.
- `isDuplicate`: A boolean indicating whether a stock (based on the `value` state) already exists in the `stocks` array.
- `isReload`: A boolean indicating if a reload is required, typically true when the WebSocket is disconnected or closed.

### Methods

- `subscribe(isin: string)`: A method to subscribe to a specific stock identified by its ISIN. It internally calls `manageSubscription` with `SubscriptionType.Subscribe`.
- `unsubscribe(isin: string)`: A method to unsubscribe from a specific stock identified by its ISIN. It internally calls `manageSubscription` with `SubscriptionType.Unsubscribe`.
- `setValue(value: string)`: A method to set the `value` state, presumably used to track user input or filter criteria.
- `reconnect()`: A method to attempt reconnection to the WebSocket if it's closed. It also resubscribes to all stocks in the watch list.

### Usage

The returned object from `useWebSocket` provides the necessary interface to interact with a WebSocket for real-time stock data updates. Components using this hook can display stock data, handle user subscriptions to specific stocks, and react to changes in WebSocket connection state.

### Example

```jsx
const {
  stocks,
  webSocketState,
  subscribe,
  unsubscribe,
  setValue,
  value,
  isDuplicate,
  reconnect,
  isReload,
} = useWebSocket();

// Example usage in a component

```

---


---

## Additional features

- Light and dark mode
- Pagination

---


---

## Potential Enhancements

- Improve documentation of the components with Storybook
- Add end-to-end tests with Cypress to test all the user stories.
- Add a caching strategy to the app, so that the user can see even when they reload the page.
- Only subscribe to the stocks that are visible to the user.
- Add transitions to the app to improve the user experience.
- Improve test coverage.
- Improve typescript types.

---


---

## Answers to questions

1. What happens in case the WebSocket disconnects? How would you go further to keep
   the live data available or inform the user? Please discuss the challenges.
   ```text
   I implemented a reconnection strategy in the app, through a alert message that is displayed to the user when the
   connection is lost. The user can click on the button in the alert message to reconnect to the WebSocket. When the user
   clicks on the button, the app tries to reconnect to the WebSocket. If the reconnection is successful, the alert message
   is hidden and the user can continue using the app and the subscription to the stocks is restored. If the reconnection
   fails, the alert message is displayed again. The user can click on the button again to try to reconnect to the WebSocket.
    
   Another way to handle this case is to automatically try to reconnect to the WebSocket using a exponential backoff
   strategy. This way the user doesn't have to click on the button to reconnect to the WebSocket. The app will try to
   reconnect automatically and if the reconnection is successful, the user can continue using the app and the subscription
   to the stocks is restored.
   ```
2. What happens if a user adds an instrument multiple times to their list? Please discuss possible challenges and
   mitigations.

    ```text
    I implemented a check in the app, so that the user can't add the same stock twice. If the user tries to add a stock
    that is already in his watch list, he will see a notification that he already has this stock in his watch list.
    Another way to handle this case is to allow the user to add the same stock multiple times, but display a notification
    that he already has this stock in his watch list and display the number of times he added it. This way the user can
    see how many times he added the same stock and decide if he wants to keep it or remove it.
    ```

3. What potential performance issues might you face when this app scales with multiple subscriptions? How would you
   improve the speed and user experience?

    ```text
    I implemented a pagination strategy in the app, so that the user can see only the 5 latest stocks at a time. This way
    we can avoid rendering a lot of data and also avoid unnecessary updates and re-renders. One improvement that I would
    like to make here is to only subscribe to the stocks that are visible to the user. In my current implementation
    I subscribe to all of the stocks that the user adds to his watch list, even if they are not visible to him.
    This can be improved by subscribing to the stocks only when the user navigates to the page with the stock list.
    ```

---


---

## Development experience improvements

### Linting and formatting

- Added eslint and prettier to the project.
- Added husky and lint-staged to the project to run eslint and prettier on commit.
- editorconfig added to the project to keep the same code style across different editors.
