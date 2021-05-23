import { GET_RESULT } from "./types";

export const testResult = (data) => (dispatch) => {
  dispatch({
    type: GET_RESULT,
    payload: data,
  });
};
