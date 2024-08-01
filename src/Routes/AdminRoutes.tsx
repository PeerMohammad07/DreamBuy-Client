import { Route, Routes } from 'react-router-dom'
import Login from '../components/admin/Login'
import Dashboard from '../components/admin/Dashboard'
import Layout from '../components/layouts/admin/Layout'
import UserManagement from '../components/admin/UserManagement'
import ProtectLogin from './Private/protectLoginAdmin'
import SellerManagement from '../components/admin/SellerManagement'
import CategoryManagement from '../components/admin/CategoryManagement'
import PropertyManagement from '../pages/admin/PropertyManagement'

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
      </Routes>
    </>
  )
}

export default AdminRoutes
