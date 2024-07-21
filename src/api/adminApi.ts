import Api from "../Services/axios"
import { adminEndpoints } from "../Services/endPoints/adminEndpoints"

export const signIn = async (email:string,password:string)=> {  
  return await Api.post(adminEndpoints.signIn,{
    email,
    password
  })
}

export const getUsers = async ()=> {
  return await Api.get(adminEndpoints.getUsers)
}

export const blockUser = async (id:string,status:boolean)=> {
  return Api.put(adminEndpoints.blockUser,{
    id,
    status
  })
}

export const logout = async ()=> {
  return Api.post(adminEndpoints.logout)
}

