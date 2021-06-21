import {
  LOGIN_SUCCESS,
  USER_LOADING,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
} from "../actions/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
  token: AsyncStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      // console.log(action.payload.token);
      AsyncStorage.setItem("token", action.payload.token);
      AsyncStorage.setItem("token_type", action.payload.token_type);
      // setToken(action.payload.token, action.payload.token_type);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: true,
      };
    case LOGIN_FAIL:
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
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
