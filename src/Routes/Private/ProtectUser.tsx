import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { rootState } from '../../Redux/store/store'
import { useNavigate } from 'react-router-dom'

interface ProtectSellerRoutes{
  children:ReactNode
}

const ProtectUserRoutes:React.FC<ProtectSellerRoutes> = ({children}) => {
  const navigate = useNavigate()
  const userData = useSelector((prevState:rootState)=> prevState.user.userData)
  
  if(!userData){
    navigate('/')
  }

  return children
}

export default ProtectUserRoutes
