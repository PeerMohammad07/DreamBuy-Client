import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../components/layouts/user/Navbar'
import Footer from '../../components/layouts/user/Footer'
import ChatBot from '../../components/common/ChatBot'

const UserMainPage = () => {
  const location = useLocation()
  return (
    <>
       <Navbar/>
       <Outlet/>
       {location.pathname == "/chat/user" || location.pathname == "/homes/" || location.pathname == "/homes/sale" || location.pathname == "/homes/rent" ? <></>:<Footer/>}
       <ChatBot/>
    </>
  )
}

export default UserMainPage
