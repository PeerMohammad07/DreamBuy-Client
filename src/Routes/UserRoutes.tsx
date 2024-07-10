// import React from 'react'
import { Routes,Route } from 'react-router-dom'
// import Navbar from '../components/layouts/Navbar'
import Login from '../pages/user/Login'
import Otp from '../components/user/Otp'

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/verifyOtp' element={<Otp/>}/>
      </Routes>
    </>
  )
}

export default UserRoutes
