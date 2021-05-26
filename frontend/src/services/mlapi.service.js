import http from "./http-common";

class mlApiService {
  uploadData(data) {
    return http.post("upload", data);
  }
  selectModel(data) {
    return http.get(`select-model/${data.model_name}`);
  }
  trainModel(data) {
    return http.post("train-model", data);
  }
  prepareData(data) {
    return http.post("prepare-data", data);
  }
  downloadModel() {
    return http.get("download-model");
  }
  predictData(data) {
    return http.post("predict", data);
  }
}

export default new mlApiService();
