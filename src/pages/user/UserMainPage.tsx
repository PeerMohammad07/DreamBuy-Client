import { Outlet } from 'react-router-dom'
import Navbar from '../../components/layouts/user/Navbar'
import Footer from '../../components/layouts/user/Footer'

const UserMainPage = () => {
  return (
    <>
       <Navbar/>
       <Outlet/>
       <Footer/>
    </>
  )
}

export default UserMainPage
