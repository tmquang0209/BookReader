import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Fix the import statement
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
