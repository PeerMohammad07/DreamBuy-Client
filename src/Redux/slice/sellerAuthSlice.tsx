import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellerLogin : false
}

const sellerSlice = createSlice({
  name : "seller",
  initialState,
  reducers : {
    sellerLogin : (state)=> {
      state.sellerLogin = true
    },

    sellerLogout : (state)=> {
      state.sellerLogin = false
    }
  }
})

export const {sellerLogin,sellerLogout} = sellerSlice.actions
export default sellerSlice.reducer