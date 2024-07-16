// import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import SellerRoutes from './Routes/SellerRoutes'
import './App.css'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'


function App() {
  const router = createBrowserRouter([
    {path:"/*",element:<UserRoutes/>},
    {path:"/seller/*",element:<SellerRoutes/>},
    {path:"/admin/*",element:<AdminRoutes/>}
  ])

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
