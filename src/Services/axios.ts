import axios,{AxiosInstance} from "axios"

const Api:AxiosInstance = axios.create({
  baseURL:"http://54.196.204.166",
  withCredentials:true
})

export default Api