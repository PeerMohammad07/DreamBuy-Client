import { Route, Routes } from 'react-router-dom'
import Login from '../components/admin/Login'
import Layout from '../components/layouts/admin/Layout'
import UserManagement from '../components/admin/UserManagement'
import ProtectLogin from './Private/protectLoginAdmin'
import SellerManagement from '../components/admin/SellerManagement'
import CategoryManagement from '../components/admin/CategoryManagement'
import PropertyManagement from '../pages/admin/PropertyManagement'
import AmenitiesManagement from '../pages/admin/AmenitiesManagement'
import Dashboard from '../pages/admin/Dashboard'
import FourNotFourPage from '../components/common/404page'

const AdminRoutes = () => {
  return (
    <>
      <Routes>
         <Route path='/login' element={<ProtectLogin><Login/></ProtectLogin>}/>
         <Route path='/' element={<Layout><Dashboard/></Layout>}/>
         <Route path='/user' element={<Layout><UserManagement/></Layout>}/>
         <Route path='/seller' element={<Layout><SellerManagement/></Layout>}/>
         <Route path='/category' element={<Layout><CategoryManagement/></Layout>}/>
         <Route path='/property' element={<Layout><PropertyManagement/></Layout>}/>
         <Route path='/amenities' element={<Layout><AmenitiesManagement/></Layout>}/>
         <Route path="*" element={<FourNotFourPage />} />
      </Routes>
    </>
  )
}

export default AdminRoutes
