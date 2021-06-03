import React from "react";
import "./css/Header.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
function Header() {
  return (
    <div className="header">
      <Link exact to="/">
        <DeviceHubIcon fontSize="large" className="alpha__logo" />
      </Link>
      <div className="header__right">
        {/* <Link to="/login"> */}
        <Button
          href="/login"
          color="primary"
          className="header__rightBtn"
          variant="contained"
        >
          LogIn
        </Button>
        {/* </Link> */}
        <Button
          href="/signup"
          color="secondary"
          className="header__rightBtn"
          variant="contained"
        >
          SignUp
        </Button>
      </div>
    </div>
  );
}

export default Header;
