import { combineReducers } from "redux";
import test from "./test";
import testResult from "./testResult";
export default combineReducers({
  test: test,
  testResult: testResult,
});
