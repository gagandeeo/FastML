import axios from "axios";

export const mlApi = axios.create({
  baseURL: `http://fastml-alb-174465273.us-east-2.elb.amazonaws.com/api/test/`,
  headers: {
    "Content-type": "application/json",
  },
});

export const userApi = axios.create({
  baseURL: `http://fastml-alb-174465273.us-east-2.elb.amazonaws.com/api/test/`,
});

export default { mlApi, userApi };
