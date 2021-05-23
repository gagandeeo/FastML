import { GET_RESULT } from "../actions/types";

const initialState = {
  result: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESULT:
      return {
        ...state,
        result: action.payload,
      };

    default:
      return state;
  }
}
