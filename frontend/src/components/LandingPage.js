import { Typography } from "@material-ui/core";
import React from "react";
import "./css/LandingPage.css";
import Header from "./Header";

function LandingPage() {
  return (
    <div className="landingPage__container">
      <Header />
      <div className="report__view1">
        <Typography variant="button">
          Start Training your Model! Click Log In.
        </Typography>
      </div>
    </div>
  );
}

export default LandingPage;
