# Frontend Coding Challenge

Hello there, thanks again for your interest in Trade Republic. To kick off the
interview process we have prepared a short coding exercise for you, to demonstrate your knowledge of the language and tools we use to develop our web applications.

**Please note: The coding test should show that you feel comfortable working with any JavaScript framework. We use Vue.js and prefer it but you can use another framework if you feel that it will better show off your skills. The assessment of your submission will not change if you use a different framework.**

In case you have any questions, feel free to reach out to your dedicated recruiter.

## Content

- [Intro & Context](#context)
- [The Application](#the-application)
- [Using this application](#using-this-application)
- [The Challenge](#task-description)
  - [Task 1](#task-1)
  - [Task 2](#task-2)
  - [Task 3](#task-3)
- [Socket Reference](#socket-reference)
- [Challenge Questions](#questions)
- [Submit your solution](#how-to-submit-your-solution)

## Context

Developing our app, we work with a REST API as well as real-time streaming market
data to display the latest stock prices with millisecond latency. You should feel
comfortable developing an app to address these two types of network interaction. The WebSocket server you’ll be using accepts and emits messages in JSON format.

## Things we care for:

✅ Unit tests

✅ Semantic HTML

✅ Responsive Design

✅ Documentation

✅ Accessibility

## Nice to have:

🤩 Use of Reactive programming libraries like RxJS.

### Glossary

We don’t expect you to be a trading expert and some of the terms are quite specific to the space. Here’s some of the terms we use in the task:
| Term | Definition |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `ISIN` | The 12-digit alphanumeric code that uniquely identifies a specific instrument |
| `instrument` | A tradable asset, or a negotiable item, such as a security, commodity, derivative, or index, or any item that underlies a derivative. |
| `bid` | The highest price a buyer will pay to buy a specified number of shares of an instrument at any given time. |
| `ask` | The lowest price at which a seller will sell the instrument. |

---

## The Application

In the interest of saving you some time, we provided a working [Vue](https://vuejs.org) application. This application also includes a small set of components for you to use. Please note, using these components is optional, you are welcome to change them in any way you want, you should only submit something you are comfortable with.

## Using this application

### Pre-requisites

Please make sure to have [Node](https://nodejs.org) 16 installed.

### Running the code

Once you have unzipped the folder and are ready to start, you can run `yarn` (or `npm install`) to install dependencies. After that, you can run:

```bash
# npm
npm run dev

# or yarn
yarn dev
```

This will start the application in development mode. It will also start the WebSocket server on port 8425. 

You can see the client application running in your browser by going to http://localhost:3000.

---

## Task Description

In this repository we have provided you with a minimal [Vue.js](https://vuejs.org) + [Vite](https://vitejs.dev) application. Your task is to extend this app so that it allows a user to subscribe/unsubscribe to a list of stocks. The user should be able to subscribe to a stock by entering its [ISIN](https://www.investopedia.com/terms/i/isin.asp) number into an input and then see the current price of the stock displayed in a list view.

What we would like to see is clean, readable code that you would be **comfortable submitting to your colleagues for review**. Please explain decisions that you’ve made and what you would do if you had more time to continue development. You can add them to this `README.md` file.

Requirements:

- We want to see how you interpret [user stories](#user-stories) into a solution, please fulfill all of the stories provided.
- Please avoid using a UI library, we want to be able to see your styling skills.
- We recommend using Vue but you can use a different framework if you feel that you’ll be able to demonstrate your skills better.
- Great user experience is important to us at Trade Republic. Please approach the challenge from a user’s perspective and build something you would be happy to put into user’s hands.
- Please also provide setup instructions and answer the following [questions](#questions) in your README.

## Tasks

### Task 1

Create a form that allows a user to submit an ISIN and add it to a watch list.

#### User Stories

> As a user, I should be able to submit an ISIN and it should be added to my watch list.

> As a user, I should not be able to subscribe to the same ISIN twice so that I don’t get confused by seeing multiple versions of the same stock.

> As a user, I should not be able to subscribe to an empty or invalid ISIN.

> Validation rules: An ISIN is a 12-character alphanumeric code. It consists of three parts: A two letter country code, a nine character alpha-numeric national security identifier, and a single check digit.
> Example:- US0378331005.

### Task 2

Create the UI and render the watch list created in the previous task to the DOM.

#### User Stories

> As a user, I should be able to view a list of my subscribed stocks displaying the latest stock price received from the WebSocket connection so that I can keep track of multiple stocks at the same time.

> As a user, I should be able to unsubscribe from a stock that’s in my watch list so that I can focus on the stocks I’m interested in.

> As a user, I should be notified if the websocket disconnects and the data is not up to date so that I know that the price is not accurate.

> As a user, I should be able to view their stocks on desktop and mobile screen widths so that I am able to use the app on my mobile browser.

### Task 3

At this point, you can consider the challenge to be complete.

This task is intentionally left open for you to add any feature you want to the application. Anything is valid, from improvements to Accessibility all the way to UI Transitions, CSS, etc.

---

## Socket Reference

The WebSocket server is started when you run `yarn dev`. You can then connect to it at

```URL
ws://localhost:8425/
```

To subcribe to a specific security

```JSON
{
    "subscribe": "${ISIN}"
}
```

To unsubscribe to a specific security

```JSON
{
    "unsubscribe": "${ISIN}"
}
```

#### Example Request

To subscribe to the BASF instrument you would use

```JSON
{
    "subscribe": "DE000BASF111"
}
```

#### Sample Response

You would then receive a WebSocket stream with messages in the following format

```JSON
{
    "isin": "DE000BASF111",
    "price": 11.316359370403822,
    "bid": 11.306359370403822,
    "ask": 11.326359370403821
}
```

---

## Questions

1. What happens in case the WebSocket disconnects? How would you go further to keep
   the live data available or inform the user? Please discuss the challenges.

2. What happens if a user adds an instrument multiple times to their list? Please discuss possible challenges and mitigations.

3. What potential performance issues might you face when this app scales with multiple subscriptions? How would you improve the speed and user experience?

---

## How to submit your solution

Please zip your project and submit zip archive via the Greenhouse link attached to the email with the code challenge. Your dedicated recruiter will receive the notification about your submission and will send it for the team review.
