import Api from "../Services/axios";
import { chatEndpoints } from "../Services/endPoints/chatEndpoints";
import errorHandle from "./errorHandling";

export const getConversation = async (id:string)=>{
  try{
    return await Api.get(`${chatEndpoints.getConversations}?id=${id}`)
  }catch(error){
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}

export const sendMessage = async (senderId:string,recieverId:string,message:string)=>{
  try {
    return await Api.post(chatEndpoints.sendMessage,{senderId,recieverId,message})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}

export const getMessages = async (senderId:string|undefined,receiverId:string)=>{
  try {
    return await Api.get(`${chatEndpoints.getMessages}?senderId=${senderId}&receiverId=${receiverId}`)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}

export const createConversation = async (senderId:string|undefined,receiverId:string|undefined)=>{
  try {
    return await Api.post(chatEndpoints.createConversation,{senderId,receiverId})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}