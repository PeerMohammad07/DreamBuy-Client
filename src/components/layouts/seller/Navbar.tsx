import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../Redux/store/store";
import { sellerLogout } from "../../../Redux/slice/sellerAuthSlice";
import { CgProfile } from "react-icons/cg";
import { Logout } from "../../../api/sellerApi";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sellerStatus = useSelector(
    (state: rootState) => state.seller.sellerLogin
  );

  const handleLogout = async () => {
    const response = await Logout();
    console.log(response, "seller handle logout");
    dispatch(sellerLogout());
  };

  return (
    <>
      {sellerStatus ? (
        <nav className="h-20 flex justify-between px-6 flex-1 flex-wrap items-center bg-black">
          <img src="/dreambuywhitelogo.png" alt="" className="h-12 mt-2" />
          <div className="flex justify-between pe-8">
            <button className="text-black bg-white hover:bg-orange-400 hover:text-black font-bold py-2 mr-6 px-4 rounded transition-colors duration-300">
              Add Property
            </button>
            <div
              className="relative flex justify-around px-3"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <CgProfile className="text-white text-4xl" />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-6 w-44 bg-white rounded-md shadow-lg z-10">
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
          </div>
        </nav>
      ) : (
        navigate("/seller/register")
      )}
    </>
  );
};

export default Navbar;
