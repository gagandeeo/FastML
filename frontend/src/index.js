import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./redux/configureStore";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
