import { formDataProps } from "../components/common/ChangePassword";
import { Property } from "../components/seller/AddProperty";
import Api from "../Services/axios";
import { sellerEndpoints } from "../Services/endPoints/sellerEndpoints";
import errorHandle from "./errorHandling";

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

export const updateKycImage = async (buffer: string, type: string, id: string) => {
  try {
    return await Api.post(sellerEndpoints.updateKycImage, { buffer, type, id });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
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

export const addProperty = async (data: Property) => {
  try {
    return await Api.post(sellerEndpoints.addProperty, { data });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
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

export const updateSeller = async (name: string, phone: string, sellerId: string | undefined) => {
  try {
    return await Api.post(sellerEndpoints.updateSeller, { name, phone, sellerId });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};
