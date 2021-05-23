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
}

export default new mlApiService();
