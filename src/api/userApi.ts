import { editFormData } from "../pages/user/EditProfile";
import { IProperty } from "../pages/user/PropertyDetails";
import { AppDispatch } from "../Redux/store/store";
import Api from "../Services/axios";
import { userEndPoints } from "../Services/endPoints/userEndpoints";
import errorHandle from "./errorHandling";

interface signUpData {
  name: string;
  email: string;
  password: string;
}

interface response {
  data: {
    status: number;
    message: string;
  };
}

interface premiumData {
  id:string
  price : string,
  interval : string
}

// Sign Up Api
export const signUp = async (data: signUpData): Promise<response> => {
  try {
    const { name, email, password } = data;
    const response = await Api.post(userEndPoints.signUp, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Verify Api
export const verifyOtp = async (otp: number) => {
  try {
    return await Api.post(userEndPoints.verifyOtp, { otp });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Logout Api
export const logout = async () => {
  try {
    return await Api.post(userEndPoints.logout);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Get token
export const getToken = async () => {
  try {
    return await Api.post(userEndPoints.getToken);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Sign in
export const signIn = async (email: string, password: string) => {
  try {
    return await Api.post(userEndPoints.signIn, { email, password });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Resend OTP
export const resendOtp = async () => {
  try {
    return await Api.post(userEndPoints.resendOtp);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Google login
export const googleAuthLogin = async (name: string, email: string, image: string) => {
  try {
    return await Api.post(userEndPoints.googleAuth, { name, email, image });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Google Register
export const googleAuthRegister = async (name: string, email: string, image: string)=>{
  try {
    return await Api.post(userEndPoints.googleRegister, { name, email, image });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
}


// Forgot password
export const forgotPassword = async (email: string) => {
  try {
    return await Api.post(userEndPoints.forgotPassword, { email });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Reset password
export const resetPassword = async (password: string, userId: string, token: string) => {
  try {
    return await Api.post(userEndPoints.resetPassword, { password, userId, token });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Get rent property
export const getRentProperty = async () => {
  try {
    return await Api.get(userEndPoints.getRentProperty);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// Get sale property
export const getSaleProperty = async () => {
  try {
    return await Api.get(userEndPoints.getSaleProperty);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

// update User
export const updateUser = async (data:editFormData,dispatch:AppDispatch) => {
  try {    
    return await Api.put(userEndPoints.updateUser, data);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
    throw err;
  }
};

// premium 
export const getPremium = async (data:premiumData,dispatch:AppDispatch)=> {
  try {
    return await Api.patch(userEndPoints.getPremium,{
      data
    })
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
    throw err;
  }
}


// updateUserPremium
export const updatePremium = async (type:string,id:string,dispatch:AppDispatch)=>{
  try {
    return await Api.patch(userEndPoints.updatePremium,{
      type,
      id
    })
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
    throw err;
  }
}

// getproduct Detail

export const productDetail = async (id:string|undefined)=>{
  try {
    return await Api.post(userEndPoints.productDetail,{id})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}

// Send Owner Details

export const sendOwnerDetails = async (userName:string|undefined,PropertyDetails:IProperty|null,sellerId:string|undefined,email:string|undefined,dispatch:AppDispatch)=>{
  try{
    return await Api.post(userEndPoints.sendOwnerDetail,{sellerId,email,userName,PropertyDetails})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
    throw err;
  }
}

// Get User 

export const getUser = async (id:string,role:string|undefined)=>{
  try{
    return await Api.get(`${userEndPoints.getUser}?id=${id}&role=${role}`)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}



export const getAllWhishlistProperty = async (userId:string|undefined,dispatch:AppDispatch) =>{
  try {
    return await Api.get(`${userEndPoints.whishlist}/${userId}`)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
  }
}

export const removeFromWishlist = async (userId:string,propertyId:string,dispatch:AppDispatch)=> {
  try {
    return await Api.delete(`${userEndPoints.whishlist}/${userId}/${propertyId}`)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
  }
}

export const addToWishlist = async (userId:string,propertyId:string|undefined,dispatch:AppDispatch)=>{
  try {
    return await Api.post(userEndPoints.whishlist,{userId,propertyId})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
  }
}

export const propertyListing = async (
  search: any,
  filter: any,
  sort: any,
  locationSearch : any
) => {
  try {
    return await Api.get(
      `${userEndPoints.listProperty}?search=${search}&filter=${filter}&sort=${sort}&locationSearch=${locationSearch}`
    );
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

