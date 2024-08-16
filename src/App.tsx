// import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import SellerRoutes from './Routes/SellerRoutes'
import './App.css'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import { useEffect, useState } from 'react';
import AllApplicationSkelton from './components/common/LoadingSkelton/AllApplicationSkelton';

function App() {
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  })


  const router = createBrowserRouter([
    {path:"/*",element:<UserRoutes/>},
    {path:"/seller/*",element:<SellerRoutes/>},
    {path:"/admin/*",element:<AdminRoutes/>}
  ])

  return (
    <>
    {
      loading ? <>
      <div className='flex justify-center items-center'>
      <AllApplicationSkelton/>
      </div>
      </> :
      <>
      <ToastContainer/>
      <RouterProvider router={router}/>
      </>
    }
    </>
  )
}

export default App
