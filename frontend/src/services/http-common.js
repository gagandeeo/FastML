import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:8000/test/`,
  headers: {
    "Content-type": "application/json",
  },
});
