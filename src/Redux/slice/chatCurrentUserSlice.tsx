import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IonlineUsers } from "../../pages/Chat/ChatPage";

export interface ChatState {
  id: string;
  userData: any|null; 
  onlineUsers : IonlineUsers[]
}

const initialState: ChatState = {
  id: '',
  userData: null,
  onlineUsers:[]
};

const chatSlice = createSlice({
  name: "chatCurrentUser",
  initialState,
  reducers: {
    setCurrentUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setCurrentUserData: (state, action: PayloadAction<any| null>) => {
      state.userData = action.payload;
    },
    clearCurrentUser: (state) => {
      state.id = '';
      state.userData = null;
    },
    setOnlineUsers : (state,action:PayloadAction<IonlineUsers[]>)=>{
      state.onlineUsers = action.payload
    }
  }
});

export const { setCurrentUserId, setCurrentUserData, clearCurrentUser ,setOnlineUsers } = chatSlice.actions;

export default chatSlice.reducer;
