import { POST_TEST } from "../actions/types";
const initialState = {
  test: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_TEST:
      return {
        ...state,
        test: action.payload,
      };

    default:
      return state;
  }
}
