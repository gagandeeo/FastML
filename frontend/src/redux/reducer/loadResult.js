import { LOAD_RESULT } from "../actions/types";

const initialState = {
  load: { isLoading: false, error: false },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_RESULT:
      return {
        ...state,
        load: action.payload,
      };
    default:
      return state;
  }
}
