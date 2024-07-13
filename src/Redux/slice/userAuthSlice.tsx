import {createSlice} from "@reduxjs/toolkit"


const initialState = {
  userLogin : false
}

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    userLogin : (state)=>{
      state.userLogin = true
    },

    userLogout : (state)=> {
      state.userLogin = false
    }
  }
})


export const {userLogin,userLogout} = userSlice.actions
export default userSlice.reducer