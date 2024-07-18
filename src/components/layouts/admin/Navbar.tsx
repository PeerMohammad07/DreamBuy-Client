import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../Redux/slice/adminAuthSlice";
import { rootState } from "../../../Redux/store/store";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminStatus = useSelector((state: rootState) => state.admin.adminLogin);

  const handleLogout = async () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  return (
    <nav className="h-16 flex justify-between items-center border-b">
      <div className="flex items-center">
        <div
          className="relative flex items-center px-3"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
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
      <div className="ml-auto pr-8">
        <CgProfile className="text-4xl text-gray-800 cursor-pointer hover:text-gray-600" />
      </div>
    </nav>
  
  );
};

export default Navbar;
