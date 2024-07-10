import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slice/UserAuthSlice"
import { combineReducers } from "@reduxjs/toolkit"

const AllReducers = combineReducers({
  user :  userReducer
})

const store = configureStore({
  reducer: AllReducers
})

export default store