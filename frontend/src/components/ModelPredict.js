import React from "react";
import mlApiService from "../services/mlapi.service";
import "./css/ModelPredict.css";

function ModelPredict() {
  const [fileName, setFileName] = React.useState(null);
  const handleLoadData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(e.target.files[0]);
    mlApiService
      .predictData(formData)
      .then((response) => {
        // console.log(response);
        const file = new Blob([response.data]);
        const fileURL = URL.createObjectURL(file);
        let a = document.createElement("a");
        a.href = fileURL;
        a.download = "download_prediction.csv";
        a.click();
        setFileName(e.target.files[0]);
      })
      .catch((err) => {
        console.log(err);
      });
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
          Click to Load Data and Download Predictions
        </label>
        {fileName ? (
          <p>
            {fileName.name} - {(fileName.size / 1000).toFixed(2) + "KB"}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default ModelPredict;
