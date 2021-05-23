import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

export default function configureStore() {
  const initialState = {};
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancer = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancer);
  const store = createStore(rootReducer, initialState, composedEnhancers);

  return store;
}
