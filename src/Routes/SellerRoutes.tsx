//import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellerLoginAndRegisteration from '../pages/seller/SellerLoginAndRegisteration'
import ResetPassword from '../components/common/ResetPassword'
import ProtectLogin from './Private/protectLoginSeller'
import Mainpage from '../pages/seller/Mainpage'
import Profile from '../components/seller/Profile'
import AddProperty from '../components/seller/AddProperty'
import ProtectSellerRoutes from './Private/ProtectSellerRoutes'
import { ExpandProvider } from '../Context/ExpandContext'
import ChatPage from '../pages/Chat/ChatPage'
import PropertyManagement from '../pages/seller/PropertyManagement'
import EditProperty from '../pages/seller/EditProperty'

const SellerRoutes = () => {

  return (
    <>
      <ExpandProvider>
        <Routes>
          <Route path='/register' element={<ProtectLogin><SellerLoginAndRegisteration /></ProtectLogin>} />
          <Route path='/resetPassword/:token' element={<ProtectLogin><ResetPassword /></ProtectLogin>} />
          <Route path='/' element={<ProtectSellerRoutes><Mainpage /></ProtectSellerRoutes>}>
            <Route index element={<Profile />} />
            <Route path='/addProperty' element={<AddProperty />} />
            <Route path='/chat/:role' element={<ChatPage />} />
            <Route path='/property' element={<PropertyManagement/>} />
            <Route path='/editProperty/:id' element={<EditProperty/>} />
          </Route>
        </Routes>
      </ExpandProvider>
    </>
  )
}

export default SellerRoutes
