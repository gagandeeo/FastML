import { combineReducers } from "redux";
import test from "./test";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import testResult from "./testResult";
import loadResult from "./loadResult";
import auth from "./auth";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  test: test,
  testResult: testResult,
  loadResult: loadResult,
  auth: auth,
});

export default persistReducer(persistConfig, rootReducer);
// export default rootReducer;
