import React, { useState } from "react";
import "./css/ModelTraining.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import mlApiService from "../services/mlapi.service";
import { testResult } from "../redux/actions/testResult";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ModelSelection from "./ModelSelection";
import { Input, Slider, TextField } from "@material-ui/core";

function valuetext(value) {
  return `${value}°C`;
}

function ModelTraining(props) {
  const params = [];
  const [expanded, setExpanded] = React.useState(false);
  const [fileName, setFileName] = useState(null);
  const [prepare, setPrepare] = useState(true);
  const [targets, setTargets] = useState(null);
  const [testSize, setTestSize] = useState(0.25);
  const [modelName, setModelName] = useState(null);

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
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(e.target.files[0]);
    mlApiService
      .uploadData(formData)
      .then((res) => {
        console.log(res);
        setFileName(e.target.files[0]);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      hyper_params: props.data.hyper_params,
      targets: targets,
      test_size: testSize,
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
      <div className="file__input">
        <input
          className="file"
          id="file"
          type="file"
          onChange={handleLoadData}
        />
        <label htmlFor="file">Load Data</label>
        {fileName ? (
          <p>
            {fileName.name} - {(fileName.size / 1000).toFixed(2) + "KB"}
          </p>
        ) : null}
      </div>
      <div className="prepare__accordian">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography>
              {modelName ? (
                <label>{modelName}</label>
              ) : (
                <label>Select Model</label>
              )}
            </Typography>
          </AccordionSummary>
          <ModelSelection func={setExpanded} setName={setModelName} />
        </Accordion>
      </div>
      <div className="prepare__accordian">
        <Accordion
          expanded={expanded}
          onChange={(e) => setExpanded(!expanded)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography>Train Model</Typography>
          </AccordionSummary>
          <div className="prepare__accordian">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>Prepare Training Data</Typography>
              </AccordionSummary>
              <div className="prepare__accdetails">
                <div className="prepare__options">
                  <input
                    style={{ marginLeft: "24%" }}
                    type="checkbox"
                    checked={prepare}
                    onChange={handlePrepareChange}
                  />
                  <label style={{ marginRight: "25%" }}>DropNa</label>
                </div>

                <div className="prepare__options">
                  <TextField
                    style={{ width: "100%" }}
                    size="small"
                    variant="filled"
                    label="Imputer-Name"
                    onChange={handlePrepareChange}
                  />
                </div>
                <div className="prepare__options">
                  <TextField
                    size="small"
                    style={{ width: "100%" }}
                    variant="filled"
                    label="Encoder-Name"
                    onChange={handlePrepareChange}
                  />
                </div>
                <div className="prepare__options">
                  <TextField
                    style={{ width: "100%" }}
                    size="small"
                    variant="filled"
                    label="Scaler-Name"
                    onChange={handlePrepareChange}
                  />
                </div>
                <TextField
                  size="small"
                  variant="outlined"
                  className="target__input"
                  label="Target Class-Name"
                  onChange={handleTargetChange}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  className="target__input"
                  label="test_size = 0.25"
                  onChange={(e) => setTestSize(e.target.value)}
                />
              </div>
            </Accordion>
          </div>
          <Divider />
          {props.data ? (
            <form onSubmit={(e) => handleSubmit(e)} className="training__form">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Typography>Set HyperParams</Typography>
                </AccordionSummary>
                {Object.keys(props.data.hyper_params).map((key, index) => {
                  return (
                    <div className="form__input" key={index}>
                      <label>{key}</label>
                      {/* <Slider
                        className="param__slider"
                        // getAriaValueText={valuetext}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={110}
                        onChange={(e) => {
                          props.data.hyper_params[`${key}`] = parseInt(
                            e.target.value
                          );
                        }}
                      /> */}
                      <input
                        onChange={(e) => {
                          props.data.hyper_params[`${key}`] = parseInt(
                            e.target.value
                          );
                        }}
                        placeholder="default"
                        type="text"
                      />
                    </div>
                  );
                })}
              </Accordion>

              <button type="submit">Submit</button>
            </form>
          ) : null}
        </Accordion>
      </div>
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
