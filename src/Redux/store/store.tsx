import {configureStore} from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "../slice/userAuthSlice"
import sellerReducer from "../slice/sellerAuthSlice"
import adminReducer from "../slice/adminAuthSlice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export type rootState = ReturnType<typeof AllReducers>

const userPersistConfig = {
  key: 'user',
  storage,
};

const sellerPersistConfig = {
  key: 'seller',
  storage
}

const adminPersistConfig = {
  key:"admin",
  storage
}

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persisitedSellerReducer = persistReducer(sellerPersistConfig,sellerReducer)
const persisitedAdminReducer = persistReducer(adminPersistConfig,adminReducer)

const AllReducers = combineReducers({
  user :  persistedUserReducer,
  seller : persisitedSellerReducer,
  admin : persisitedAdminReducer
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