import Api from "../Services/axios";
import { sellerEndpoints } from "../Services/endPoints/sellerEndpoints";

interface SignUpData {
  name:string,
  email:string,
  phone:number,
  password:string
}

export const sellerSignUp = async (data:SignUpData)=> {
    return await Api.post(sellerEndpoints.signUp,{
      name:data.name,
      email:data.email,
      phone:data.phone,
      password:data.password
    })
}  

export const verifyOtp = async (otp:number) => {
    try {
      return await Api.post(sellerEndpoints.verifyOtp,{otp})
    } catch (error) {
      console.log(error);
    }
}


export const SignIn = async (email:string,password:string)=> {
    return await Api.post(sellerEndpoints.signIn,{email,password})
}

export const Logout = async ()=> {
  return await Api.post(sellerEndpoints.logout)
}

export const resendOtp = async ()=> {
  return await Api.post(sellerEndpoints.resendOtp)
}

export const forgotPasswordSeller = async (email:string)=> {
  return await Api.post(sellerEndpoints.forgotPassword,{email})
}

export const resetPasswordSeller = async (password:string,userId:string,token:string)=> {  
  return await Api.post(sellerEndpoints.resetPassword,{password,userId,token})
}


export const updateKycImage = async (buffer:string, type:string,id:string)=> {    
  return await Api.post(sellerEndpoints.updateKycImage,{
    buffer,
    type,
    id
  })
}

export const getSeller = async ()=> {;
  return await Api.get(sellerEndpoints.getSeller)
}

export const kycStatusUpdate = async (id:string,status:string)=> {
  return await Api.post(sellerEndpoints.kycStatusUpdate,{id,status})
}


export const blockSeller = async (id:string,status:boolean)=> {
  return await Api.post(sellerEndpoints.blockSeller,{
    id,
    status
  })
}