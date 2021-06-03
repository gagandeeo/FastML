import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/types";

// import { setToken } from "../../services/http-common";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("token_type", action.payload.token_type);
      // setToken(action.payload.token, action.payload.token_type);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("token_type");
      return {
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
