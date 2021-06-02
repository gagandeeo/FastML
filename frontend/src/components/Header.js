import React from "react";
import "./css/Header.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
      <h3>Header</h3>
      <div className="header__right">
        {/* <Link to="/login"> */}
        <Button href="/login" className="header__rightBtn" variant="contained">
          LogIn
        </Button>
        {/* </Link> */}
        <Button className="header__rightBtn" variant="contained">
          SignUp
        </Button>
      </div>
    </div>
  );
}

export default Header;
