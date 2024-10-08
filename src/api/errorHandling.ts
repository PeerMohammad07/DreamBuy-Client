import  { AxiosError } from "axios"
import { toast } from "react-toastify"
import { AppDispatch } from "../Redux/store/store"
import { userLogout } from "../Redux/slice/userAuthSlice"
import { logout } from "./userApi"


interface Error {
  message : string
}

const errorHandle = async (error:Error|AxiosError,dispatch?:AppDispatch)=> {
  try {    
    const axiosError = error as AxiosError
    if(axiosError.response?.data){
      const errResp = axiosError.response.data as Error
      if(errResp.message.includes("Not authorized")){
        if(dispatch){
          dispatch(userLogout())
          await logout()
        }
        localStorage.setItem('authError',"You are not authorized")
        window.location.href = '/login'
        return
      }else if(errResp.message == 'You are blocked by admin!'){
        toast.error(errResp.message)
        return
      }else {
        toast.error(errResp.message) 
      } 
    }
  } catch (error) {
    toast.error("something went wrong please try again")
  }
}

export default errorHandle