import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import  authReducer from "./features/authReducer";
import categoryReducer from "./features/categoryReducer";
import productReducer from "./features/productReducer";
import sellerReducer from "./features/sellerReducer"
import homeReducer from "./features/homeReducer"
import cartReducer from "./features/cartReducer";
import orderReducer from "./features/orderReducer";
import dashboardUser from "./features/dashboardReducer"
import paymentReducer from "./features/paymentReducer";
import chatReducer from "./features/chatReducer";
import backOfficeChatReducer from "./features/backOfficeChatReducer";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist:['payment']
};

const rootReducer:any = combineReducers({
  auth:authReducer,
  category:categoryReducer,
  product:productReducer,
  seller:sellerReducer,
  home:homeReducer,
  cart:cartReducer,
  order:orderReducer,
  payment:paymentReducer,
  dashboardUser:dashboardUser,
  chat:chatReducer,
  backOfficeChat:backOfficeChatReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store:any = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  },
  devTools:true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
