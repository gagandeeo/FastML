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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ModelResult(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  const handleDownload = (e) => {
    // mlapiService
    //   .downloadModel()
    //   .then((response) => {
    //     const file = new Blob([response.data]);
    //     const fileURL = URL.createObjectURL(file);
    //     let a = document.createElement("a");
    //     a.href = fileURL;
    //     a.download = "model.joblib";
    //     a.click();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // axios({
    //   url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    //   method: "GET",
    //   responseType: "blob",
    // }).then((response) => {
    //   fileDownload(response.data, "ap.jpg");
    // });
  };
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  var data = [];
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

  const propTypes = {
    result: PropTypes.object,
  };
  return (
    <div className="model__result">
      {props.result ? (
        <>
          <div>
            <Button onClick={handleOpen} variant="contained" size="large">
              {" "}
              Predict Data
            </Button>
            <Modal
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

              {/* <div className="report__graphview">
                <Card>
                  <Plot
                    data={[
                      {
                        z: props.result.misc.conf_matrix,
                        type: "heatmap",
                        // colorscale: [
                        //   [0, "#3D9970"],
                        //   [1, "#000000"],
                        // ],
                      },
                    ]}
                    layout={{ title: "HeatMap" }}
                  />
                </Card>
              </div> */}
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
const mapStateToProps = (state) => ({
  result: state.testResult.result,
});
export default connect(mapStateToProps, null)(ModelResult);
