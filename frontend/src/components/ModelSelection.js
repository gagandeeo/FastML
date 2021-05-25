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
      name: "LogisticRegression",
    },
    {
      name: "SVC",
    },
    {
      name: "SVR",
    },
    {
      name: "GaussianNB",
    },
    {
      name: "KNeighborsClassifier",
    },
    {
      name: "KNeighborsRegressor",
    },
    {
      name: "KMeans",
    },
    {
      name: "RandomForestClassifier",
    },
    {
      name: "RandomForestRegressor",
    },
    {
      name: "GradientBoostingClassifier",
    },
    {
      name: "GradientBoostingRegressor",
    },
  ];

  const propTypes = {
    postTest: PropTypes.func.isRequired,
  };
  const selectModel = (e, name) => {
    props.func(true);
    props.setName(name);
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
          <label>{user.name}</label>
        </div>
      ))}
    </div>
  );
}

const mapDispatchToProps = {
  postTest,
};

export default connect(null, mapDispatchToProps)(ModelSelection);
