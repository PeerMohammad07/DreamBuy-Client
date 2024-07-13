import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getToken } from "../api/userApi";
import { userLogin } from "../Redux/slice/userAuthSlice";

const useProtectLogin = async () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const token = await getToken()
  if(token.status){
    dispatch(userLogin())
    navigate('/')
  }
}

export default useProtectLogin
