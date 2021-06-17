import React, { useState } from "react";
import "./css/ModelTraining.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import mlApiService from "../services/mlapi.service";
import { testResult } from "../redux/actions/testResult";
import { loadResult } from "../redux/actions/loadResult";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ModelSelection from "./ModelSelection";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";

const useStyles = makeStyles({
  root: {
    width: "50%",
    alignSelf: "center",
    borderRadius: "100px",
  },
});

function ModelTraining(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [fileName, setFileName] = useState(null);
  const [usecols, setUsecols] = useState(null);
  const [indexCol, setIndexCol] = useState(10000);
  const [prepare, setPrepare] = useState(true);
  const [targets, setTargets] = useState("");
  const [testSize, setTestSize] = useState(0.25);
  const [modelName, setModelName] = useState(null);
  const [encoder, setEncoder] = useState("");
  const [imputer, setImputer] = useState("");
  const [scaler, setScaler] = useState("");
  const [modelType, setModelType] = useState("");
  const [allow, setAllow] = useState(true);

  const handleHyperChange = (e, key) => {
    if (typeof props.data.hyper_params[`${key}`] == "number") {
      props.data.hyper_params[`${key}`] = Number(e.target.value);
    } else if (typeof props.data.hyper_params[`${key}`] == "boolean") {
      if (e.target.value.toLowerCase() === "true") {
        props.data.hyper_params[`${key}`] = true;
      } else {
        props.data.hyper_params[`${key}`] = false;
      }
    } else {
      if (Number(e.target.value) != "NaN") {
        props.data.hyper_params[`${key}`] = Number(e.target.value);
      } else if (e.target.value.toLowerCase() === "true") {
        props.data.hyper_params[`${key}`] = true;
      } else if (e.target.value.toLowerCase() === "false") {
        props.data.hyper_params[`${key}`] = true;
      } else {
        props.data.hyper_params[`${key}`] = e.target.value;
      }
    }
  };

  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const propTypes = {
    data: PropTypes.object,
    loadResult: PropTypes.func.isRequired,
    testResult: PropTypes.func.isRequired,

    user_id: PropTypes.number.isRequired,
  };
  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  }, []);

  const handleTimer = () => {
    setInterval(() => {
      progressRef.current();
    }, 500);
  };

  const handleTargetChange = (e) => {
    e.preventDefault();
    setTargets(e.target.value);
  };
  const handleLoadData = async (e) => {
    // e.preventDefault();
    progressRef.current();
    const formData = new FormData();
    formData.append("user_id", props.user_id);
    formData.append("file", e.target.files[0]);
    console.log(formData);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }
    try {
      await mlApiService.uploadData(formData, config).then((res) => {
        setFileName(e.target.files[0]);
        setAllow(false);
        console.log(res);
      });
      handleTimer();
    } catch (err) {
      console.log(err);
      // alert("Load Data Again");
    }
  };
  const handlePrepareChange = (e) => {
    e.preventDefault();
    setPrepare(e.target.checked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }

    // console.log(props.data.hyper_params);
    const data = {
      user_id: props.user_id,
      model_type: modelType,
      hyper_params: props.data.hyper_params,
      usecols: usecols,
      index_col: indexCol,
      targets: targets,
      test_size: testSize,
      dropna: prepare,
      impute: imputer,
      encoding: encoder,
      scaling: scaler,
    };

    console.log(data);
    if (targets) {
      props.loadResult({ isLoading: true });

      try {
        await mlApiService.trainModel(data, config).then((res) => {
          props.testResult(res.data);
          props.loadResult({ isLoading: false });
        });
      } catch (err) {
        const status = err.response.status;
        console.log(err);

        if (status === 500) {
          props.loadResult({
            isLoading: false,
            error: status,
            msg: err.response.data.detail,
          });
          alert(err.response.data.detail);
        } else if (status === 422) {
          props.loadResult({
            isLoading: false,
            error: status,
            msg: "verify inputs",
          });
          alert("verify inputs");
        }
      }
    } else {
      alert("Please fill mandatory inputs");
    }
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
        <label htmlFor="file">
          {fileName ? (
            <p style={{ color: "white", margin: "8px 0px" }}>
              {fileName.name} - {(fileName.size / 1000).toFixed(2) + "KB"}
            </p>
          ) : (
            <Fragment>
              {" "}
              {progress ? (
                <div className={classes.root}>
                  <LinearProgress
                    variant="buffer"
                    value={progress}
                    valueBuffer={buffer}
                  />
                </div>
              ) : (
                "Load Data"
              )}
            </Fragment>
          )}
        </label>
      </div>
      <div className="prepare__accordian">
        <Accordion disabled={allow} className="accordian__attr">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography component={"span"}>
              {modelName ? (
                <label>{modelName}</label>
              ) : (
                <label>Select Model</label>
              )}
            </Typography>
          </AccordionSummary>
          <ModelSelection
            func={setExpanded}
            setType={setModelType}
            setName={setModelName}
          />
        </Accordion>
      </div>
      <div className="prepare__accordian">
        <Accordion
          disabled={allow}
          className="accordian__attr"
          expanded={expanded}
          onChange={(e) => setExpanded(!expanded)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography component={"span"}>Train Model</Typography>
          </AccordionSummary>
          <Divider light />
          {/* <div className="prepare__accordian"> */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography component={"span"}>Prepare Training Data</Typography>
            </AccordionSummary>
            <Divider
              style={{ backgroundColor: "gray", height: "2px" }}
              variant="middle"
            />
            <div className="prepare__accdetails">
              <div className="prepare__options" style={{ width: "80%" }}>
                <input
                  style={{ marginLeft: "24%" }}
                  type="checkbox"
                  checked={prepare}
                  onChange={handlePrepareChange}
                />
                <label style={{ marginRight: "25%" }}>DropNa</label>
              </div>

              <div className="prepare__options">
                <FormControl variant="filled" style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Imputer-Name
                  </InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    variant="filled"
                    autoWidth={true}
                    value={imputer}
                    onChange={(e) => setImputer(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"SimpleImputer"}>SimpleImputer</MenuItem>
                    <MenuItem value={"IterativeImputer"}>
                      IterativeImputer
                    </MenuItem>
                    <MenuItem value={"MissingIndicator"}>
                      MissingIndicator
                    </MenuItem>
                    <MenuItem value={"KNNImputer"}>KNNImputer</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="prepare__options">
                <FormControl variant="filled" style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Encoder-Name
                  </InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    variant="filled"
                    autoWidth={true}
                    value={encoder}
                    onChange={(e) => setEncoder(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"OrdinalEncoder"}>OrdinalEncoder</MenuItem>
                    <MenuItem value={"OneHotEncoder"}>OneHotEncoder</MenuItem>
                    <MenuItem value={"LabelEncoder"}>LabelEncoder</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="prepare__options">
                <FormControl variant="filled" style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Scaler-Name
                  </InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    variant="filled"
                    autoWidth={true}
                    value={scaler}
                    onChange={(e) => setScaler(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"MinMaxScaler"}>MinMaxScaler</MenuItem>
                    <MenuItem value={"StandardScaler"}>StandardScaler</MenuItem>
                    <MenuItem value={"MaxAbsScaler"}>MaxAbsScaler</MenuItem>
                    <MenuItem value={"RobustScaler"}>RobustScaler</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="prepare__options">
                <TextField
                  value={targets}
                  required
                  id="standard-required"
                  label="Required"
                  error={targets ? false : true}
                  size="medium"
                  variant="outlined"
                  className="target__input"
                  label="Target Class-Name"
                  onChange={handleTargetChange}
                />
              </div>
              <div className="prepare__options">
                <TextField
                  size="medium"
                  variant="outlined"
                  className="target__input"
                  label="Cols to use (col1_Name, col2_Name,..)"
                  onChange={(e) => setUsecols(e.target.value)}
                />
              </div>
              <div className="prepare__options">
                <TextField
                  size="medium"
                  variant="outlined"
                  className="target__input"
                  label="Index-col=None"
                  onChange={(e) => setIndexCol(parseInt(e.target.value))}
                />
              </div>
              <div className="prepare__options">
                <TextField
                  size="small"
                  variant="outlined"
                  className="target__input"
                  label="test_size = 0.25"
                  onChange={(e) => setTestSize(e.target.value)}
                />
              </div>
            </div>
          </Accordion>
          {/* </div> */}
          <Divider light />
          {props.data ? (
            <form onSubmit={(e) => handleSubmit(e)} className="training__form">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Typography component={"span"}>Set HyperParams</Typography>
                </AccordionSummary>
                <Divider
                  style={{ backgroundColor: "gray", height: "2px" }}
                  variant="middle"
                />
                {Object.keys(props.data.hyper_params).map((key, index) => {
                  return (
                    <div className="form__input" key={index}>
                      <label>{key}</label>
                      <input
                        onChange={(e) => handleHyperChange(e, key)}
                        placeholder={
                          props.data.hyper_params[key]
                            ? typeof props.data.hyper_params[key] !== "boolean"
                              ? props.data.hyper_params[key]
                              : props.data.hyper_params[key].toString()
                            : "null"
                        }
                        type="text"
                      />
                    </div>
                  );
                })}
              </Accordion>
              <Button
                variant="contained"
                color="secondary"
                className="submit__button"
                type="submit"
              >
                {" "}
                Train
              </Button>
            </form>
          ) : null}
        </Accordion>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.test.test,
  user_id: state.auth.user.user_id,
});
const mapDispatchToProps = {
  testResult,
  loadResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTraining);
