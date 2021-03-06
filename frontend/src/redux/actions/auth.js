import usersApiServices from "../../services/usersApi.services";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./types";

export const login = (data) => (dispatch) => {
  usersApiServices
    .login(data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      //   dispatch ({
      //       type: LOGIN_FAIL
      //     })
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
