import  { AxiosError } from "axios"
import { toast } from "react-toastify"
import { AppDispatch } from "../Redux/store/store"
import { sellerLogout } from "../Redux/slice/sellerAuthSlice"
import { Logout } from "./sellerApi"


interface Error {
  message : string
}

const errorHandle = async (error:Error|AxiosError,dispatch?:AppDispatch)=> {
  try {    
    const axiosError = error as AxiosError
    if(axiosError.response?.data){
      const errResp = axiosError.response.data as Error
      if(errResp.message.includes("Not authorized")){
       toast.error(errResp.message)
      }else if(errResp.message == 'You are blocked by admin!'){
        if(dispatch){
          dispatch(sellerLogout())
          await Logout()
        }
        localStorage.setItem('sellerAuthError',"You are not authorized")
        window.location.href = '/seller/register'
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