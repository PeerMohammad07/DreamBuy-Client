// import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from '../components/layouts/user/Navbar'
import Login from '../pages/user/Login'
import Otp from '../components/user/Otp'
import ProtectLogin from './Private/protectLoginUser'
import ResetPassword from '../components/common/ResetPassword'

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}/>
        <Route path='/login' element={<ProtectLogin><Login/></ProtectLogin>}/>
        <Route path='/verifyOtp' element={<ProtectLogin><Otp/></ProtectLogin>}/>
        <Route path='/resetPassword/:token' element={<ProtectLogin><ResetPassword/> </ProtectLogin>}/>
      </Routes>
    </>
  )
}

export default UserRoutes
