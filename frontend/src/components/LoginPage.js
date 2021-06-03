import React from "react";
import usersApiService from "../services/usersApi.services";
import "./css/LoginPage.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logout } from "../redux/actions/auth";
import { Button, Input, TextField } from "@material-ui/core";
import { Redirect } from "react-router";
function LoginPage(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  const handleLogout = (e) => {
    props.logout();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("username", email);
    formData.append("password", password);
    props.login(formData);
  };

  return (
    <div className="login__container">
      <form onSubmit={handleLogin} className="login__containerBox">
        <TextField
          value={email}
          required
          // error={targets ? false : true}
          size="small"
          variant="outlined"
          className="login__containerInp"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          value={password}
          required
          type="password"
          // error={targets ? false : true}
          size="small"
          variant="outlined"
          className="login__containerInp"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          style={{ marginTop: "10px" }}
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
        <Button
          href="/signup"
          type="submit"
          style={{ marginTop: "10px" }}
          variant="contained"
          color="secondary"
        >
          Not a Member?
        </Button>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  login,
  logout,
};

export default connect(null, mapDispatchToProps)(LoginPage);
