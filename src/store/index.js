import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Fix the import statement
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "root",
    storage: storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
