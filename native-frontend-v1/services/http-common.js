import axios from "axios";

export const mlApi = axios.create({
  baseURL: `http://fastml-back-alb-2141039727.us-east-2.elb.amazonaws.com/test/`,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const userApi = axios.create({
  baseURL: `http://fastml-back-alb-2141039727.us-east-2.elb.amazonaws.com/test/`,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export default { mlApi, userApi };
