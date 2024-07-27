// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../Redux/store/store";
import { userLogout } from "../../../Redux/slice/userAuthSlice";
import { logout } from "../../../api/userApi";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import Hamburger from 'hamburger-react'
import Sidebar from "./Sidebar";


const Navbar = () => {

  const dispatch = useDispatch()
  const userStatus = useSelector((state: rootState) => state.user.userLogin)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    const response = await logout()
    console.log(response, "logout response");

    dispatch(userLogout())
  }

  return (

    <>
      <nav>
        <div className="bg-white flex justify-between">
          <img src="/dreambuylogo.png" alt="" className="h-12 mt-2 ms-2" />
          <ul className="items-center space-x-12 text-lg hidden xl:flex lg:flex md:flex">
            <li className="italic font-bold hover:not-italic hover:underline"><Link to={'/seller'}>Sell</Link></li>
            <li className="italic font-bold hover:not-italic hover:underline">Buy</li>
            <li className="italic font-bold hover:not-italic hover:underline">Rent</li>
            <li className="italic font-bold hover:not-italic hover:underline">About us</li>
            <li className="italic font-bold hover:not-italic hover:underline">Contact us</li>
          </ul>

          {/* Hamburger */}
          <div className="xl:hidden lg:hidden md:hidden flex items-center z-50">
            <Hamburger size={20} toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>

          <Sidebar isOpen={isMenuOpen}  onClose={() => setIsMenuOpen(false)} userStatus={userStatus?true:false}/>

          <div className="hidden xl:flex lg:flex md:flex items-center pe-5">
            {userStatus ?
              <div
                className="relative flex justify-around px-1"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <CgProfile className="text-4xl" />
                {isDropdownOpen && (
                  <div className="absolute right-3 mt-8 w-44 bg-white rounded-md shadow-lg z-10">
                    <button
                      className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    >
                      <span>Home</span>
                      <IoHome className="ml-2" />
                    </button>
                    <button
                      className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    >
                      <Link to={'/profile'}>Profile</Link>
                      <FaRegUser className="ml-2" />
                    </button>
                    <button
                      className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      onClick={handleLogout}
                    >
                      <span>Logout</span>
                      <LuLogOut className="ml-2" />
                    </button>
                  </div>
                )}
              </div>
              : <Link to="/login">
                <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-4 text-center rounded">
                  Login
                </button>
              </Link>}
          </div>
        </div>
      </nav>
    </>
    // <nav>
    //   <div className="h-18 flex justify-between px-6 flex-1 flex-wrap items-center">
    //     

    // <div className="xl:hidden lg:hidden md:hidden flex items-center">
    //   <Hamburger color="black" toggled={isMenuOpen} toggle={setIsMenuOpen} size={20} />
    // </div>

    //     <ul className={`hidden xl:flex lg:flex justify-between ps-8 sm:hidden  ${isMenuOpen ? 'flex' : 'hidden'} flex-col absolute top-16 left-0 w-full bg-white shadow-md z-10`}>
    //       <Link className="font-medium px-7" to={'/seller'}>Sell</Link>
    //       <li className="font-medium px-7">Buy</li>
    //       <li className="font-medium px-7">Rent</li>
    //       <li className="text-1xl font-medium px-4">About us</li>
    //       <li className="text-1xl font-medium px-4">Contact us</li>
    //     </ul>

    //      <div className="flex justify-between pe-8">
    //       <div className="flex justify-around px-3">
    //         {
    // userStatus ? <div
    //   className="relative flex justify-around px-1"
    //   onMouseEnter={() => setIsDropdownOpen(true)}
    //   onMouseLeave={() => setIsDropdownOpen(false)}
    // >
    //   <CgProfile className="text-4xl" />
    //   {isDropdownOpen && (
    //     <div className="absolute right-3 mt-8 w-44 bg-white rounded-md shadow-lg z-10">
    //       <button
    //         className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
    //       >
    //         <span>Home</span>
    //         <IoHome className="ml-2" />
    //       </button>
    //       <button
    //         className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
    //       >
    //         <span>Profile</span>
    //         <FaRegUser className="ml-2" />
    //       </button>
    //       <button
    //         className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
    //         onClick={handleLogout}
    //       >
    //         <span>Logout</span>
    //         <LuLogOut className="ml-2" />
    //       </button>
    //     </div>
    //   )}
    // </div>
    //             :
    //             <Link to="/login">
    //               <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-4 text-center rounded">
    //                 Login
    //               </button>
    //             </Link>
    //         }
    //       </div>
    //       <div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;

