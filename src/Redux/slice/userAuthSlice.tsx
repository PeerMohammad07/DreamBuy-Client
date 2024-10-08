import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface IPremiumSubscription {
  subscriptionType?: 'weekly' | 'monthly' | 'three_months';
  startDate?: Date;
  expiryDate?: Date;
}

export interface User{
  _id:string
  name: string;
  email: string;
  password: string;
  isBlocked: boolean;
  otpVerified: boolean;
  image?: string;
  isPremium: boolean;
  premiumSubscription?: IPremiumSubscription;
}

export interface UserState {
  userLogin: boolean;
  userData: User | null;
}

const initialState:UserState = {
  userLogin : false,
  userData : null
}

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    userLogin : (state,action:PayloadAction<User|null>)=>{
      state.userLogin = action.payload !== null
      state.userData = action.payload
    },

    userLogout : (state)=> {
      state.userLogin = false
      state.userData = null
    }
  }
})


export const {userLogin,userLogout} = userSlice.actions
export default userSlice.reducer