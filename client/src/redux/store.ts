import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import storage from "./storage/storage";

import userReducer from "./features/user/userSlice";
import transactionReducer from "./features/transaction/transactionSlice";

import { authLoginApi } from "./apis/login_user/loginUserApi";
import { authRegisterApi } from "./apis/register_user/registerUserApi";
import { userApi } from "./apis/user/userApi";

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
  [authLoginApi.reducerPath]: authLoginApi.reducer,
  [authRegisterApi.reducerPath]: authRegisterApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
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
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
