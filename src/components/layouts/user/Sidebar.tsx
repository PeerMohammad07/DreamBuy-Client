import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineLogin } from 'react-icons/hi';
import { LuLogOut } from 'react-icons/lu';
import { CgProfile } from 'react-icons/cg';
import { TiTick } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../../Redux/slice/userAuthSlice';
import { logout } from '../../../api/userApi';
import { rootState } from '../../../Redux/store/store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userStatus: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userStatus }) => {
  const dispatch = useDispatch();
  const userData = useSelector((prevState:rootState)=> prevState.user.userData)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        onClose();
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onClose]);

  const handleLogout = async () => {
    const response = await logout();
    console.log(response, "logout response");
    dispatch(userLogout());
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={onClose} />}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}
      >
        <div className="flex items-center justify-between p-4 border-b h-16 bg-blue-500">
          <img src="/dreambuywhitelogo.png" alt="Dream Buy Logo" className="h-12 w-52" />
        </div>
        <div className="mt-8 space-y-4 px-4 overflow-y-auto h-full">
          <Link to="/seller" className="flex items-center text-lg border-b py-2" onClick={onClose}>
            <span className="ml-2">Sell</span>
          </Link>
          <Link to="/homes/sale" className="flex items-center text-lg border-b py-2" onClick={onClose}>
            <span className="ml-2">Buy</span>
          </Link>
          <Link to="/homes/rent" className="flex items-center text-lg border-b py-2" onClick={onClose}>
            <span className="ml-2">Rent</span>
          </Link>
          <Link to="/about" className="flex items-center text-lg border-b py-2" onClick={onClose}>
            <span className="ml-2">About us</span>
          </Link>
          <Link to="/chat/user" className="flex items-center text-lg border-b py-2" onClick={onClose}>
            <span className="ml-2">Chat</span>
          </Link>
          {userData?.isPremium ? (
             <Link to="/premium" className="flex items-center text-lg border-b py-2" onClick={onClose}>
              <span className="ml-2">Premium</span>
            </Link>
          ) : (
            <Link to="/premium">
              <button className="flex items-center text-lg text-orange-500 w-full border-b py-2">
                <span className="ml-2">Premium</span>
                <span className="animate-bounce">✨</span>
              </button>
            </Link>
          )}
          <Link to="/profile" className="flex items-center text-lg border-b py-2" onClick={onClose}>
            <CgProfile className="text-xl" />
            <span className="ml-2">Profile</span>
          </Link>
          {userStatus ? (
            <button
              className="flex items-center text-lg text-red-500 w-full border-b py-2"
              onClick={handleLogout}
            >
              <LuLogOut className="text-xl" />
              <span className="ml-2">Logout</span>
            </button>
          ) : (
            <Link to="/login">
              <button className="flex items-center text-lg text-blue-500 w-full border-b py-2">
                <HiOutlineLogin className='text-xl' />
                <span className="ml-2">Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
