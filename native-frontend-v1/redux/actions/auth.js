import usersApiServices from "../../services/usersApi.service";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./types";

export const login = (data, navigation) => (dispatch) => {
  usersApiServices
    .login(data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      // dispatch({
      //   type: LOGIN_FAIL,
      // });
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
