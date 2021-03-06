import React from "react";
import mlApiService from "../services/mlapi.service";
import "./css/ModelPredict.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    width: "50%",
    alignSelf: "center",
    borderRadius: "100px",
  },
});

function ModelPredict(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [fileName, setFileName] = React.useState(null);

  const propTypes = {
    user_id: PropTypes.number.isRequired,
  };

  const handleLoadData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("user_id", props.user_id);
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
      mlApiService.predictData(formData, config).then((response) => {
//         const file = new Blob([response.data]);
//         const fileURL = URL.createObjectURL(file);
        let a = document.createElement("a");
        a.href = response.data.url;
        a.download = "download_prediction.csv";
        a.click();
        setFileName(e.target.files[0]);
      });
      handleTimer();
    } catch (err) {
      alert("Try again!");
    }
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
  });

  const handleTimer = () => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);
  };
  return (
    <div className="predict__container">
      <div className="file__input">
        <input
          className="file"
          id="file1"
          type="file"
          onChange={handleLoadData}
        />
        <label htmlFor="file1">
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
                "Load Data to predict and Download them"
              )}
            </Fragment>
          )}
        </label>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user_id: state.auth.user.user_id,
});

export default connect(mapStateToProps, null)(ModelPredict);
