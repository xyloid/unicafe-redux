import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);


const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  let sum = good + neutral + bad;

  if (sum > 0) {
    let average = (good - bad) / sum;
    let positive = (good / sum) * 100;
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={sum} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive + " %"} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
};

const App = () => {

  const sendAction = (action) => {
    store.dispatch({
      type:action,
    });
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>sendAction("GOOD")}>good</button>
      <button onClick={()=>sendAction("OK")}>neutral</button>
      <button onClick={()=>sendAction("BAD")}>bad</button>
      <button onClick={()=>sendAction("ZERO")}>reset stats</button>
      
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad}/>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
