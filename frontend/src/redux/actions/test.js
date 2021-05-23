import { POST_TEST } from "./types";

export const postTest = (data) => (dispatch) => {
  dispatch({
    type: POST_TEST,
    payload: data,
  });
};
