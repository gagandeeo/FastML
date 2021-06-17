import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

const initialState = {};
const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancer = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancer);
export const store = createStore(rootReducer, initialState, composedEnhancers);
export const persistor = persistStore(store);

// export default { store, persistor };
export default { store, persistor };
