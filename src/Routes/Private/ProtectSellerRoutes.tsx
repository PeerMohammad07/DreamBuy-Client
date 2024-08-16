import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { rootState } from '../../Redux/store/store'
import DetailLogin from '../../pages/seller/DetailLogin'

interface ProtectSellerRoutes{
  children:ReactNode
}

const ProtectSellerRoutes:React.FC<ProtectSellerRoutes> = ({children}) => {
  const sellerData = useSelector((prevState:rootState)=> prevState.seller.sellerData)
  
  if(!sellerData){
    return <><DetailLogin/></>
  }

  return children
}

export default ProtectSellerRoutes
