import axios from "axios";

const token = localStorage.getItem("token");
const token_type = localStorage.getItem("token_type");

export default axios.create({
  baseURL: `http://localhost:8000/test/`,
  headers: {
    "Content-type": "application/json",
    Authorization: `${token_type} ${token}`,
  },
});
