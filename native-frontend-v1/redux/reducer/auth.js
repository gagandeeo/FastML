import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
  token: AsyncStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // console.log(action.payload.token);
      AsyncStorage.setItem("token", action.payload.token);
      AsyncStorage.setItem("token_type", action.payload.token_type);
      // setToken(action.payload.token, action.payload.token_type);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("token_type");
      return {
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
