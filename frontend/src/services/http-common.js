import axios from "axios";

export const mlApi = axios.create({
  baseURL: `fastml-back-ALB-2141039727.us-east-2.elb.amazonaws.com/test/`,
  headers: {
    "Content-type": "application/json",
  },
});

export const userApi = axios.create({
  baseURL: `fastml-back-ALB-2141039727.us-east-2.elb.amazonaws.com/test/`,
});

export default { mlApi, userApi };
