import  { AxiosError } from "axios"
import { toast } from "react-toastify"


interface Error {
  message : string
}

const errorHandle = (error:Error|AxiosError)=> {
  try {    
    const axiosError = error as AxiosError
    if(axiosError.response?.data){
      const errResp = axiosError.response.data as Error
      if(errResp.message.includes("Not authorized")){
        toast.error("You are not Authorized")
      }else if(errResp.message == 'You are blocked by admin!'){
        toast.error(errResp.message)
      }else {
        toast.error(errResp.message) 
      } 
    }
  } catch (error) {
    toast.error("something went wrong please try again")
  }
}

export default errorHandle