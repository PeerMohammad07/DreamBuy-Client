// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "../pages/user/Login";
import Otp from "../components/user/Otp";
import ProtectLogin from "./Private/protectLoginUser";
import ResetPassword from "../components/common/ResetPassword";
import UserMainPage from "../pages/user/UserMainPage";
import UserHome from "../pages/user/UserHome";
import Profile from "../pages/user/Profile";

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
        </Route>

        <Route element={<UserMainPage/>}>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
