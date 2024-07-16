// import React from 'react'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Navbar from '../components/layouts/user/Navbar'
import Login from '../pages/user/Login'
import Otp from '../components/user/Otp'
import ProtectLogin from './Private/protectLogin'

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}/>
        <Route path='/login' element={<ProtectLogin><Login/></ProtectLogin>}/>
        <Route path='/verifyOtp' element={<ProtectLogin><Otp/></ProtectLogin>}/>
      </Routes>
    </>
  )
}

export default UserRoutes
