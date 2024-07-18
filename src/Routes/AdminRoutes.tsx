import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/admin/Login'
import Dashboard from '../components/admin/Dashboard'
import Layout from '../components/layouts/admin/Layout'
import UserManagement from '../components/admin/UserManagement'

const AdminRoutes = () => {
  return (
    <>
      <Routes>
         <Route path='/login' element={<Login/>}/>
         <Route path='/' element={<Layout><Dashboard/></Layout>}/>
         <Route path='/user' element={<Layout><UserManagement/></Layout>}/>
      </Routes>
    </>
  )
}

export default AdminRoutes
