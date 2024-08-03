import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the SellerProfile interface
interface SellerProfile {
  image:string;
  email: string;
  isBlocked: boolean;
  kycVerified: string;
  name: string;
  otpVerified: boolean;
  password: string;
  phone: number;
  __v: number;
  _id: string;
}

// Define the initial state interface
export interface SellerState {
  sellerLogin: boolean;
  sellerData: SellerProfile | null;
}

// Initial state with proper types
const initialState: SellerState = {
  sellerLogin: false,
  sellerData: null,
};

// Created the Seller slice
const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    sellerLogin: (state, action: PayloadAction<SellerProfile>) => {
      state.sellerLogin = true;
      state.sellerData = action.payload;
    },
    sellerLogout: (state) => {
      state.sellerLogin = false;
      state.sellerData = null;
    },
  },
});

export const { sellerLogin, sellerLogout } = sellerSlice.actions;
export default sellerSlice.reducer;
