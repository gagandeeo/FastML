import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./css/ModelResult.css";

function ModelResult(props) {
  const propTypes = {
    result: PropTypes.object,
  };
  return (
    <div className="model__result">
      {props.result ? <h3>{props.result.score}</h3> : null}
    </div>
  );
}
const mapStateToProps = (state) => ({
  result: state.testResult.result,
});
export default connect(mapStateToProps, null)(ModelResult);
