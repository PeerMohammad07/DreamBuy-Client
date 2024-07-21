import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/layouts/seller/Navbar'

const Mainpage = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Mainpage
