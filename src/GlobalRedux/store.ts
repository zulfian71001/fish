import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import counterReducer from './features/counterSlice'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const persistConfig = {
    key:'root',
    storage
}

const rootReducer = combineReducers({
    counter:counterReducer

})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })
export const  store = configureStore({
    reducer:persistedReducer,
    middleware:customizedMiddleware
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;