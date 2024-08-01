// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../Redux/store/store";
import { userLogin, userLogout } from "../../../Redux/slice/userAuthSlice";
import { logout } from "../../../api/userApi";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import Hamburger from 'hamburger-react'
import Sidebar from "./Sidebar";
import { TiTick } from "react-icons/ti";


const Navbar = () => {

  const dispatch = useDispatch()
  const userStatus = useSelector((state: rootState) => state.user.userLogin)
  const userData = useSelector((state: rootState) => state.user.userData)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    const response = await logout()
    console.log(response, "logout response");
    dispatch(userLogin(null))
    dispatch(userLogout())
  }

  return (

    <>
      <nav>
        <div className="bg-white flex justify-between">
          <Link to={'/'}>          <img src="/dreambuylogo.png" alt="" className="h-12 mt-2 ms-2" />
          </Link>
          <ul className="items-center space-x-12 text-lg hidden xl:flex lg:flex md:flex">
            <li className="font-semibold hover:font-bold"><Link to={'/seller'}>Sell</Link></li>
            <li className="font-semibold hover:font-bold">Buy</li>
            <li className="font-semibold hover:font-bold">Rent</li>
            <li className="font-semibold hover:font-bold">About us</li>
            <li className="font-semibold hover:font-bold">Contact us</li>
          </ul>

          {/* Hamburger */}
          <div className="xl:hidden lg:hidden md:hidden flex items-center z-50">
            <Hamburger size={20} toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>

          <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} userStatus={userStatus ? true : false} />


          <div className="hidden xl:flex lg:flex md:flex items-center pe-3 ">
            <div className="flex items-center justify-center pe-5">
              {
                userData?.isPremium ? <Link to={'/premium'}><button className="bg-orange-500 rounded-xl h-10 px-4 text-white hover:shadow-lg hover:bg-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2">
                  <span className="font-serif">Premium</span>
                  <TiTick />
                </button> </Link> : <Link to={'/premium'}>
                  <button className="bg-orange-500 rounded-xl h-10 px-4 text-white hover:shadow-lg hover:bg-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2">
                    <span className="font-serif">Premium</span>
                    <span className="animate-bounce">✨</span>
                  </button>
                </Link>
              }
            </div>
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
                      className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    >
                      <Link to={'/'} className="flex items-center justify-between">
                        <span>Home</span>
                        <IoHome className="ml-2" />
                      </Link>

                    </button>
                    <button
                      className=" px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    >
                      <Link to={'/profile'} className="flex items-center justify-between">
                        Profile
                        <FaRegUser className="ml-2" />
                      </Link>
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
  );
};

export default Navbar;

