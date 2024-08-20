import { ReactNode, useEffect } from "react";
import Sidebar from "./SideNav";
import { useSelector } from "react-redux";
import { rootState } from "../../../Redux/store/store";
import { useNavigate } from "react-router-dom";

export interface node {
  children : ReactNode
}

export default function Layout({ children }:node) {
  const navigate = useNavigate()
  const adminLogin = useSelector((prevState:rootState)=> prevState.admin.adminLogin)

  useEffect(()=>{
    if(!adminLogin){
      navigate("/admin/login")
    }
  },[])

  return (
      <Sidebar>{children}</Sidebar>
  );
}
