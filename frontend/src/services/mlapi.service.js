import { mlApi } from "./http-common";

class mlApiService {
  uploadData(data) {
    return mlApi.post("upload", data);
  }
  selectModel(data) {
    return mlApi.post(`select-model/${data.model_name}`, data);
  }
  trainModel(data) {
    return mlApi.post("train-model", data);
  }
  prepareData(data) {
    return mlApi.post("prepare-data", data);
  }
  downloadModel() {
    return mlApi.get("download-model");
  }
  predictData(data) {
    return mlApi.post("predict", data);
  }
}

export default new mlApiService();
