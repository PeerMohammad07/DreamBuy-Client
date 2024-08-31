import { formDataProps } from "../components/common/ChangePassword";
import { Property } from "../components/seller/AddProperty";
import { PartialPropertyFormData } from "../pages/seller/EditProperty";
import { AppDispatch } from "../Redux/store/store";
import Api from "../Services/axios";
import { sellerEndpoints } from "../Services/endPoints/sellerEndpoints";
import errorHandle from "./errorHandlingSeller";

interface SignUpData {
  name: string,
  email: string,
  phone: number,
  password: string
}

export const sellerSignUp = async (data: SignUpData) => {
  try {
    return await Api.post(sellerEndpoints.signUp, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password
    });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const verifyOtp = async (otp: number) => {
  try {
    return await Api.post(sellerEndpoints.verifyOtp, { otp });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const SignIn = async (email: string, password: string) => {
  try {
    return await Api.post(sellerEndpoints.signIn, { email, password });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const Logout = async () => {
  try {
    return await Api.post(sellerEndpoints.logout);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const resendOtp = async () => {
  try {
    return await Api.post(sellerEndpoints.resendOtp);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const forgotPasswordSeller = async (email: string) => {
  try {
    return await Api.post(sellerEndpoints.forgotPassword, { email });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const resetPasswordSeller = async (password: string, userId: string, token: string) => {
  try {
    return await Api.post(sellerEndpoints.resetPassword, { password, userId, token });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const updateKycImage = async (buffer: string, type: string, id: string,dispatch:AppDispatch) => {
  try {
    return await Api.post(sellerEndpoints.updateKycImage, { buffer, type, id });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
  }
};

export const kycStatusUpdate = async (id: string, status: string) => {
  try {
    return await Api.post(sellerEndpoints.kycStatusUpdate, { id, status });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const blockSeller = async (id: string, status: boolean) => {
  try {
    return await Api.post(sellerEndpoints.blockSeller, { id, status });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const addProperty = async (data: Property,dispatch:AppDispatch) => {
  try {    
    return await Api.post(sellerEndpoints.addProperty, { data });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
  }
};

export const changePassword = async (data: formDataProps) => {
  try {
    return await Api.post(sellerEndpoints.changePassword, data);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const updateSeller = async (name: string, phone: string, sellerId: string | undefined,dispatch:AppDispatch) => {
  try {
    return await Api.post(sellerEndpoints.updateSeller, { name, phone, sellerId });
  } catch (error) {
    const err: Error = error as Error;
     errorHandle(err,dispatch);
  }
};

export const getMyProperty = async (id:string|undefined,dispatch:AppDispatch)=>{
  try {
    return await Api.get(`${sellerEndpoints.getMyProperty}/${id}`)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
  }
}

export const deleteProperty = async (id:string,dispatch:AppDispatch)=>{
  try {
    return await Api.post(sellerEndpoints.deleteProperty,{id})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
  }
}

export const updateProperty = async (id:string|undefined,data:PartialPropertyFormData,dispatch:AppDispatch)=>{
  try {
    return await Api.put(sellerEndpoints.updateProperty,{id,data})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
  }
}

// boost property 
export const getBoostProperty = async (planId:string,duration:string,propertyId:string|undefined,dispatch:AppDispatch)=> {
  try {
    return await Api.post(sellerEndpoints.boostProperty,{planId,duration,propertyId})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
    throw err;
  }
}

export const boostProperty = async (id:string,type:string,dispatch:AppDispatch)=>{
  try {
    return Api.patch(sellerEndpoints.boostProperty,{propertyId:id,type})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err,dispatch);
    throw err;
  }
}