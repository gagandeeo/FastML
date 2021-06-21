import usersApiServices from "../../services/usersApi.service";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  USER_LOADING,
} from "./types";

export const login = (data, setProgress) => (dispatch) => {
  usersApiServices
    .login(data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      alert("Login Failed");
      setProgress(false);
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
