import { mlApi } from "./http-common";

class mlApiService {
  uploadData(data, config) {
    return mlApi.post("upload", data, config);
  }
  selectModel(data, config) {
    return mlApi.post(`select-model/${data.model_name}`, data, config);
  }
  trainModel(data, config) {
    return mlApi.post("train-model", data, config);
  }
  prepareData(data, config) {
    return mlApi.post("prepare-data", data, config);
  }
  //Update down
  downloadModel(config) {
    return mlApi.get("download-model", config);
  }
  predictData(data, config) {
    return mlApi.post("predict", data, config);
  }
}

export default new mlApiService();
