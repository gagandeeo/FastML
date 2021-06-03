import React from "react";
import usersApiServices from "../services/usersApi.services";
import { Button, Input, TextField } from "@material-ui/core";
import "./css/SignUp.css";
import { useHistory } from "react-router-dom";
function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const history = useHistory();
  const handleSignUp = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      username: userName,
    };

    usersApiServices
      .signup(data)
      .then((res) => {
        history.replace("/login");
      })
      .catch((err) => {
        alert(err.response.data.detail);
      });
  };

  return (
    <div className="signup__container">
      <form onSubmit={handleSignUp} className="signup__containerBox">
        <TextField
          value={userName}
          required
          // error={targets ? false : true}
          size="small"
          variant="outlined"
          className="signup__containerInp"
          label="Username"
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          value={email}
          required
          // error={targets ? false : true}
          type="email"
          size="small"
          variant="outlined"
          className="signup__containerInp"
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
          className="signup__containerInp"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          style={{ marginTop: "10px" }}
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
        <Button
          href="/login"
          type="submit"
          style={{ marginTop: "10px" }}
          variant="contained"
          color="secondary"
        >
          Already a member?
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
