import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "../slice/userAuthSlice";
import sellerReducer from "../slice/sellerAuthSlice";
import adminReducer from "../slice/adminAuthSlice";
import chatReducer, { ChatState } from "../slice/chatCurrentUserSlice"
import { UserState } from "../slice/userAuthSlice"; 
import { SellerState } from "../slice/sellerAuthSlice"; 
import { AdminState } from "../slice/adminAuthSlice"; 
import { PersistPartial } from 'redux-persist/es/persistReducer';



const userPersistConfig = {
  key: 'user',
  storage,
};

const sellerPersistConfig = {
  key: 'seller',
  storage,
};

const adminPersistConfig = {
  key: 'admin',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedSellerReducer = persistReducer(sellerPersistConfig, sellerReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);

const rootReducer = combineReducers({
  user: persistedUserReducer,
  seller: persistedSellerReducer,
  admin: persistedAdminReducer,
  chat : chatReducer

});

export type rootState = {
  user: UserState & PersistPartial; 
  seller: SellerState & PersistPartial; 
  admin: AdminState & PersistPartial; 
  chat : ChatState
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
