import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

//Reducers
import session from "./redux/session.reducer";
import snackbar from "./redux/snackbar.reducer";

const reducers = combineReducers({ session, snackbar });

const persistConfig = {
  key: "4cadia_front",
  storage,
  blacklist: [
     'snackbar'
  ],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default {
  store,
};
