import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  loaderDataReducer,
  userCredentialReducer,
  bookingDataReducer,
  websiteDetailsDataReducer,
} from "./reducers";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  userCredentialReducer,
  loaderDataReducer,
  bookingDataReducer,
  websiteDetailsDataReducer,
});

const persistConfig = {
  key: "websiteDetails",
  storage,
  keyPrefix: "",
  stateReconciler: hardSet,
  blacklist: ["loaderDataReducer"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
