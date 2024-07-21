import { Route, Routes } from 'react-router-dom'
import Login from '../components/admin/Login'
import Dashboard from '../components/admin/Dashboard'
import Layout from '../components/layouts/admin/Layout'
import UserManagement from '../components/admin/UserManagement'
import ProtectLogin from './Private/protectLoginAdmin'
import SellerManagement from '../components/admin/SellerManagement'

const AdminRoutes = () => {
  return (
    <>
      <Routes>
         <Route path='/login' element={<ProtectLogin><Login/></ProtectLogin>}/>
         <Route path='/' element={<Layout><Dashboard/></Layout>}/>
         <Route path='/user' element={<Layout><UserManagement/></Layout>}/>
         <Route path='/seller' element={<Layout><SellerManagement/></Layout>}/>
      </Routes>
    </>
  )
}

export default AdminRoutes
