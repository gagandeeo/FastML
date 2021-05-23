import React, { useState } from "react";
import "./css/ModelSelection.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postTest } from "../redux/actions/test";
import mlApiService from "../services/mlapi.service";
function ModelSelection(props) {
  const users = [
    {
      name: "LinearRegression",
    },
    {
      name: "DecisionTreeClassifier",
    },
    {
      name: " 😃 Rose",
    },
    {
      name: "😃 Mike",
    },
    {
      name: "😃 Liz",
    },
    {
      name: "LinearRegression",
    },
    {
      name: "DecisionTreeClassifier",
    },
    {
      name: " 😃 Rose",
    },
    {
      name: "😃 Mike",
    },
    {
      name: "😃 Liz",
    },
    {
      name: "LinearRegression",
    },
    {
      name: "DecisionTreeClassifier",
    },
    {
      name: " 😃 Rose",
    },
    {
      name: "😃 Mike",
    },
    {
      name: "😃 Liz",
    },
    {
      name: "LinearRegression",
    },
    {
      name: "DecisionTreeClassifier",
    },
    {
      name: " 😃 Rose",
    },
    {
      name: "😃 Mike",
    },
    {
      name: "😃 Liz",
    },
    {
      name: "LinearRegression",
    },
    {
      name: "DecisionTreeClassifier",
    },
    {
      name: " 😃 Rose",
    },
    {
      name: "😃 Mike",
    },
    {
      name: "😃 Liz",
    },
  ];

  const propTypes = {
    postTest: PropTypes.func.isRequired,
  };
  const selectModel = (e, name) => {
    e.preventDefault();

    const data = {
      model_name: name,
    };
    mlApiService
      .selectModel(data)
      .then((res) => {
        console.log(res.data);
        props.postTest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="model__selection">
      {users.map((user, index) => (
        <div
          onClick={(e) => selectModel(e, user.name)}
          className="model__list"
          key={index}
        >
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
}

const mapDispatchToProps = {
  postTest,
};

export default connect(null, mapDispatchToProps)(ModelSelection);
