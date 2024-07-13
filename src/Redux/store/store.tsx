import {configureStore} from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "../slice/userAuthSlice"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export type rootState = ReturnType<typeof AllReducers>

const userPersistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const AllReducers = combineReducers({
  user :  persistedUserReducer
})

const store = configureStore({
  reducer: AllReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

const persistStoree = persistStore(store)

export  {store,persistStoree}