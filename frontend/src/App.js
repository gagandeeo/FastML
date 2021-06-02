import "./App.css";
import Header from "./components/Header";
import React from "react";
import View from "./components/View";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LandingPage from "./components/LandingPage";

function App(props) {
  const propTypes = {
    isAuthenticated: PropTypes.bool,
  };
  console.log(props.isAuthenticated);
  return (
    <div className="app">
      <Switch>
        <Route path="/landing" component={LandingPage} />
        <Route
          path="/login"
          render={() =>
            props.isAuthenticated ? <Redirect to="/dashboard" /> : <LoginPage />
          }
        />

        <Route
          path="/dashboard"
          render={() => {
            if (props.isAuthenticated) {
              return <View />;
            } else {
              return <Redirect to="/landing" />;
            }
          }}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token,
});
export default connect(mapStateToProps, null)(App);
