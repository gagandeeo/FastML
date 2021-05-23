import React from "react";
import "./css/View.css";
import ModelResult from "./ModelResult";
import ModelSelection from "./ModelSelection";
import ModelTraining from "./ModelTraining";
function View() {
  return (
    <div className="view">
      <ModelSelection />
      <ModelResult />
      <ModelTraining />
    </div>
  );
}

export default View;
