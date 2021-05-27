import { combineReducers } from "redux";
import test from "./test";
import testResult from "./testResult";
import loadResult from "./loadResult";
export default combineReducers({
  test: test,
  testResult: testResult,
  loadResult: loadResult,
});
