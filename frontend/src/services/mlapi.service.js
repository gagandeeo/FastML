import http from "./http-common";

class mlApiService {
  uploadData(data) {
    return http.post("upload", data);
  }
  selectModel(data) {
    return http.post(`select-model/${data.model_name}`, data);
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
