// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "../pages/user/Login";
import Otp from "../components/user/Otp";
import ProtectLogin from "./Private/protectLoginUser";
import ResetPassword from "../components/common/ResetPassword";
import UserMainPage from "../pages/user/UserMainPage";
import UserHome from "../pages/user/UserHome";
import Profile from "../pages/user/Profile";
import Premium from "../pages/user/Premium";
import PaymentStatus from "../pages/user/PaymentStatus";
import PropertyDetails from "../pages/user/PropertyDetails";
import ChatPage from "../pages/Chat/ChatPage";
import { ExpandProvider } from "../Context/ExpandContext";
import Whishlist from "../pages/user/Whishlist";
import About from "../pages/user/About";

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectLogin>
              <Login />
            </ProtectLogin>
          }
        />
        <Route
          path="/verifyOtp"
          element={
            <ProtectLogin>
              <Otp />
            </ProtectLogin>
          }
        />
        <Route
          path="/resetPassword/:token"
          element={
            <ResetPassword />
          }
        />
        <Route element={<UserMainPage />}>
          <Route path="/" element={<UserHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/paymentStatus" element={<PaymentStatus/>} />
          <Route path="/propertyDetails" element={<PropertyDetails/>} />
          <Route path="/chat/:role" element={<ExpandProvider><ChatPage/></ExpandProvider>}/>
          <Route path="/wishlist" element={<Whishlist/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>

      </Routes>
    </>
  );
};

export default UserRoutes;
