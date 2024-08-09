import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../components/layouts/user/Navbar'
import Footer from '../../components/layouts/user/Footer'

const UserMainPage = () => {
  const location = useLocation()
  return (
    <>
       <Navbar/>
       <Outlet/>
       {location.pathname == "/chat/user"?<></>:<Footer/>}
    </>
  )
}

export default UserMainPage
