import axios from "axios";

export const mlApi = axios.create({
  baseURL: `http://3.131.97.46:8000/test/`,
  headers: {
    "Content-type": "application/json",
  },
});

export const userApi = axios.create({
  baseURL: `http://3.131.97.46:8000/test/`,
});

export default { mlApi, userApi };
