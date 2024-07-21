import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../Redux/slice/adminAuthSlice";
import { Avatar } from "@mui/material";
import { logout } from "../../../api/adminApi";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout()
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  const handleMouseEnter = () => {
    setIsUserMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="h-16 flex justify-end border-b items-center px-4 md:px-8 lg:px-16">
      <div className="flex items-center">
        <div
          className="flex items-center pr-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Avatar
            alt="Admin"
            src="/avatar-4.png"
            sx={{ width: 34, height: 34 }}
          />
          <h1 className="text-xl font-serif pl-3">Admin</h1>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-16 w-44 bg-white rounded-md shadow-lg z-10">
              <button
                className="flex items-center justify-around px-2 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
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
  );
};

export default Navbar;
