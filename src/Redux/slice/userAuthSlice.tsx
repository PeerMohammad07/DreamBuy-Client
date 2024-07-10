import {createSlice} from "@reduxjs/toolkit"


const initialState = {
  userLogin : false
}

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    userLogin : (state)=>{
      console.log(state);
    },

    userLogout : (state)=> {
      console.log(state);
    }
  }
})


export const {userLogin,userLogout} = userSlice.actions
export default userSlice.reducer