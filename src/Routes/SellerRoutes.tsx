//import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellerLoginAndRegisteration from '../pages/seller/SellerLoginAndRegisteration'
import ResetPassword from '../components/common/ResetPassword'
import ProtectLogin from './Private/protectLoginSeller'
import Mainpage from '../pages/admin/Mainpage'
import Profile from '../components/seller/Profile'

const SellerRoutes = () => {

  return (
    <>
    <Routes>
        <Route path='/register' element={<ProtectLogin><SellerLoginAndRegisteration/></ProtectLogin>}/>
        <Route path='/resetPassword/:token' element={<ProtectLogin><ResetPassword/></ProtectLogin>}/>
        <Route element={<Mainpage/>}>
          <Route path='/' element={<Profile/>}/>
        </Route>
    </Routes>
    </>
  )
}

export default SellerRoutes
