import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "./storage/storage";

import userReducer from "./features/user/userSlice";
import transactionReducer from "./features/transaction/transactionSlice";
import modalReducer from "./features/common/modal/modalSlice";

import { authLoginApi } from "./apis/login_user/loginUserApi";
import { authRegisterApi } from "./apis/register_user/registerUserApi";
import { userApi } from "./apis/user/userApi";
import { transactionApi } from "./apis/transaction/transactionApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
  blacklist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
  modal: modalReducer,
  [authLoginApi.reducerPath]: authLoginApi.reducer,
  [authRegisterApi.reducerPath]: authRegisterApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([
      authLoginApi.middleware,
      authRegisterApi.middleware,
      userApi.middleware,
      transactionApi.middleware,
    ]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
