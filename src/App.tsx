// import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import SellerRoutes from './Routes/SellerRoutes'
import './App.css'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { rootState } from './Redux/store/store';
import {onMessage} from "firebase/messaging"
import { useEffect } from 'react';
import { getNotificationToken, messaging } from './Services/notification/firebase';
import { setSellerBrowserToken } from './api/sellerApi';
import { setUserBrowserToken } from './api/userApi';

function App() {

  const sellerLogin = useSelector((prevState:rootState)=> prevState.seller.sellerData)
  const userLogin = useSelector((prevState:rootState)=> prevState.user.userData)

  useEffect(() => {
    onMessage(messaging, (payload) => {
      
      if (payload?.notification?.body) {
        toast(payload.notification.body);
      }
    });
  }, []);

  const setBrowserToken = async () => {
    try {
      const token = await getNotificationToken();
      if (token) {
        const currentPath = window.location.pathname;
        if (currentPath.split("/").includes("seller")) {
          await setSellerBrowserToken(token as string,sellerLogin?._id);
        } else {
          await setUserBrowserToken(token as string,userLogin?._id);
        }
      } else {
        
      }
    } catch (error) {
      
    }
  };

  useEffect(()=>{
    const requestNotificationPermission = async () => {
      try {
        if (Notification.permission !== "granted") {
          const permission = await Notification.requestPermission();
          if (permission === "granted") { 
            setBrowserToken();
          } else {
            
          }
        } else {
          setBrowserToken();
        }
      } catch (error) {
        
      }
    };

    if (userLogin) {
      requestNotificationPermission();
    }
  },[sellerLogin,userLogin])



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
