import Api from "../Services/axios"
import { userEndPoints } from "../Services/endPoints/userEndpoints"

interface signUpData {
  name : string
  email:string
  password:string
}

interface response {
  data :{
    status : number,
    message : string
  }
}

// Sign Up Api 
export const signUp = async (data:signUpData):Promise<response>=> {
  const {
    name, 
    email,
    password
  } = data

  const response = await Api.post(userEndPoints.signUp,{
    name,
    email,
    password
  })

  return response
}


// Verify Api
export const verifyOtp = async (otp:number)=> {
  return await Api.post(userEndPoints.verifyOtp,{
    otp
  })
   
}

// Logout Api
export const logout = async ()=> {
  return await Api.post(userEndPoints.logout)
}


// get token 
export const getToken = async ()=> {
  return await Api.post(userEndPoints.getToken)
}

export const signIn = async (email:string,password:string)=> {
  return await Api.post(userEndPoints.signIn,{
    email,
    password
  })
}

export const resendOtp = async ()=> {
  return await Api.post(userEndPoints.resendOtp)
}

export const googleAuthLogin = async (name:string,email:string,image:string)=> {
  return await Api.post(userEndPoints.googleAuth,{
    name,
    email,
    image
  })
}

export const forgotPassword = async (email:string)=> {
  return await Api.post(userEndPoints.forgotPassword,{email})
}

export const resetPassword = async (password:string,userId:string,token:string)=> {
  return await Api.post(userEndPoints.resetPassword,{password,userId,token})
}