import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import "./css/ModelResult.css";
import { Button, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Plot from "react-plotly.js";
import mlapiService from "../services/mlapi.service";
import Modal from "@material-ui/core/Modal";
import ModelPredict from "./ModelPredict";
import { loadResult } from "../redux/actions/loadResult";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    backgroundColor: "white",
    color: "white",
  },
}));

function ModelResult(props) {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(10);

  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };
  const propTypes = {
    loadResult: PropTypes.func.isRequired,
    result: PropTypes.object,
    load: PropTypes.object,
  };
  // const handleDownload = (e) => {

  // };
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  var data = [];

  if (props.load.isLoading) {
    setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
  }

  if (props.result) {
    if (props.result.type === 1) {
      for (
        let index = 0;
        index < props.result.misc.roc_curve.fpr.length;
        index++
      ) {
        data.push({
          x: props.result.misc.roc_curve.fpr[index],
          y: props.result.misc.roc_curve.tpr[index],
          name: `Class${index} vs Rest`,
        });
      }
    }
  }

  return (
    <div className="model__result">
      {!props.load.isLoading ? (
        <>
          {props.result ? (
            <>
              <div>
                <Button onClick={handleOpen} variant="contained" size="large">
                  {" "}
                  Predict Data
                </Button>
                <Modal
                  ref={null}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <ModelPredict />
                </Modal>
              </div>
              <div className="report__view">
                <Typography style={{ marginBottom: "20px" }} variant="button">
                  Metrics
                </Typography>
                {Object.keys(props.result.report).map((key, index) => (
                  <div key={index}>
                    {key}: {parseFloat(props.result.report[key]).toFixed(5)}
                  </div>
                ))}
              </div>
              {props.result.type === 1 ? (
                <>
                  <div className="report__graphview">
                    <Card>
                      <Plot
                        data={data}
                        layout={{
                          title: "Roc_curve",
                          xaxis: {
                            title: {
                              text: "FPR",
                            },
                          },
                          yaxis: {
                            title: {
                              text: "TPR(Recall)",
                            },
                          },
                        }}
                      />
                    </Card>
                  </div>
                  <div className="report__graphview">
                    <Card>
                      <Plot
                        data={[
                          {
                            z: props.result.misc.conf_matrix,
                            type: "heatmap",
                          },
                        ]}
                        layout={{
                          title: "HeatMap",
                          xaxis: {
                            title: {
                              text: "Predicted",
                            },
                          },
                          yaxis: {
                            title: {
                              text: "Actual",
                            },
                          },
                        }}
                      />
                    </Card>
                  </div>
                </>
              ) : null}
              {props.result.type === 0 ? (
                <>
                  <div className="report__graphview">
                    <Card>
                      <Plot
                        data={[
                          {
                            y: props.result.misc.learning_curve.train_err,
                            color: "smoker",
                            name: "train_err",
                            line: {
                              width: 2.5,
                            },
                          },
                          {
                            y: props.result.misc.learning_curve.val_err,
                            color: "smoker",
                            name: "val_err",
                            line: {
                              width: 2.5,
                            },
                          },
                        ]}
                        layout={{
                          title: "Learning_curve",
                          xaxis: {
                            title: {
                              text: "Train Data Size",
                            },
                          },
                          yaxis: {
                            title: {
                              text: "RMSE",
                            },
                          },
                        }}
                      />
                    </Card>
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <>
              {props.load.error === 500 ? (
                <h3
                  style={{
                    color: "white",
                    alignSelf: "center",
                    justifySelf: "center",
                    textAlign: "center",
                    marginTop: "35%",
                  }}
                >
                  {props.load.msg}
                </h3>
              ) : (
                <h3
                  style={{
                    color: "white",
                    alignSelf: "center",
                    marginTop: "35%",
                  }}
                >
                  <p>Train To Get Result</p>
                  <p> -Ryan Blair</p>
                </h3>
              )}
            </>
          )}
        </>
      ) : (
        <div className="loader">
          <CircularProgress
            color="secondary"
            variant="determinate"
            value={progress}
          />
          <h3 style={{ color: "white", marginTop: "10px" }}>Loading</h3>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  result: state.testResult.result,
  load: state.loadResult.load,
});
const mapDispatchToProps = {
  loadResult,
};
export default connect(mapStateToProps, mapDispatchToProps)(ModelResult);
