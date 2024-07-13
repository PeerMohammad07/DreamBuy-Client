import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from "../components/seller/Register"

const SellerRoutes = () => {


  return (
    <>
    <Routes>
        <Route path='/register' element={<Register/>}/>
    </Routes>
    </>
  )
}

export default SellerRoutes
