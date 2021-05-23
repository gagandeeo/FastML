import React, { useState } from "react";
import "./css/ModelTraining.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import mlApiService from "../services/mlapi.service";
import { testResult } from "../redux/actions/testResult";

function ModelTraining(props) {
  const params = [];
  const [value, setValue] = React.useState(30);
  const [file, setFile] = useState(null);
  const [prepare, setPrepare] = useState(true);
  const [targets, setTargets] = useState(null);

  const propTypes = {
    data: PropTypes.object,
    testResult: PropTypes.func.isRequired,
  };
  const handleTargetChange = (e) => {
    e.preventDefault();
    setTargets(e.target.value);
  };
  const handleLoadData = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const handlePrepareChange = (e) => {
    e.preventDefault();
    setPrepare(e.target.checked);
  };
  const handlePrepareData = (e) => {
    e.preventDefault();
    const data = {
      dropna: prepare,
    };
    mlApiService
      .prepareData(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const handleUploadData = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    mlApiService
      .uploadData(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      hyper_params: props.data.hyper_params,
      targets: targets,
    };
    console.log(data);
    mlApiService
      .trainModel(data)
      .then((res) => {
        props.testResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="model__training">
      <div className="load__data">
        <h1>Load Data</h1>
        <input
          type="file"
          onChange={handleLoadData}
          className="select__datainput"
        />

        <button onClick={handleUploadData} className="post__databutton">
          upload_test
        </button>
        <input
          type="checkbox"
          checked={prepare}
          onChange={handlePrepareChange}
        />
        <button onClick={handlePrepareData} className="post__databutton">
          prepare_data_test
        </button>
      </div>
      {/* {props.data ? (
        <>
          {Object.entries(props.data.hyper_params).forEach(([k, v]) => {
            console.log(k, v);
            params.push(k);
          })}
        </>
      ) : null} */}
      {props.data ? (
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {Object.keys(props.data.hyper_params).map((key, index) => {
            return (
              <div className="form__input" key={key}>
                <h3>{key}</h3>
                <input
                  onChange={(e) => {
                    props.data.hyper_params[`${key}`] = parseInt(
                      e.target.value
                    );
                  }}
                  type="text"
                />
              </div>
            );
          })}
          Target
          <input type="text" onChange={handleTargetChange} />
          <button type="submit">Submit</button>
        </form>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.test.test,
});
const mapDispatchToProps = {
  testResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTraining);
