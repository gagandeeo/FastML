import { LOAD_RESULT } from "./types";

export const loadResult = (data) => (dispatch) => {
  dispatch({
    type: LOAD_RESULT,
    payload: data,
  });
};
