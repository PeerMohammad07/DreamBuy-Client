//import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellerLoginAndRegisteration from '../pages/seller/SellerLoginAndRegisteration'
import Navbar from '../components/layouts/seller/Navbar'
import KycVerification from '../components/seller/KycVerification'
import ResetPassword from '../components/common/ResetPassword'
import ProtectLogin from './Private/protectLoginSeller'

const SellerRoutes = () => {

  return (
    <>
    <Routes>
        <Route path='/register' element={<ProtectLogin><SellerLoginAndRegisteration/></ProtectLogin>}/>
        <Route path='/' element={<Navbar/>}/>
        <Route path='/kycVerification' element={<ProtectLogin><KycVerification/></ProtectLogin>}/>
        <Route path='/resetPassword/:token' element={<ProtectLogin><ResetPassword/></ProtectLogin>}/>
    </Routes>
    </>
  )
}

export default SellerRoutes
