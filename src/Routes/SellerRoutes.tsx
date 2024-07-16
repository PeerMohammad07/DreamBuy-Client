//import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellerLoginAndRegisteration from '../pages/seller/SellerLoginAndRegisteration'
import Navbar from '../components/layouts/seller/Navbar'
import KycVerification from '../components/seller/KycVerification'

const SellerRoutes = () => {


  return (
    <>
    <Routes>
        <Route path='/register' element={<SellerLoginAndRegisteration/>}/>
        <Route path='/' element={<Navbar/>}/>
        <Route path='/kycVerification' element={<KycVerification/>}/>
    </Routes>
    </>
  )
}

export default SellerRoutes
