import Api from "../Services/axios";
import { adminEndpoints } from "../Services/endPoints/adminEndpoints";
import errorHandle from "./errorHandling"; 

export const signIn = async (email: string, password: string) => {
  try {
    return await Api.post(adminEndpoints.signIn, {
      email,
      password
    });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; 
  }
};

export const getUsers = async () => {
  try {
    return await Api.get(adminEndpoints.getUsers);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
};

export const blockUser = async (id: string, status: boolean) => {
  try {
    return await Api.put(adminEndpoints.blockUser, {
      id,
      status
    });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
};

export const logout = async () => {
  try {
    return await Api.post(adminEndpoints.logout);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
};

export const getSeller = async () => {
  try {
    return await Api.get(adminEndpoints.getSeller);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
};


export const getCategory = async () => {
  try {
    return await Api.get(adminEndpoints.getCategory);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
};

export const blockCategory = async (id: string, status: boolean) => {
  try {
    return await Api.put(adminEndpoints.blockCategory, {
      id,
      status
    });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
};