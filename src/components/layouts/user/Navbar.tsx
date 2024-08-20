import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../Redux/store/store';
import { userLogin, userLogout } from '../../../Redux/slice/userAuthSlice';
import { logout } from '../../../api/userApi';
import { Link } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa6';
import { LuLogOut } from 'react-icons/lu';
import { TiTick } from 'react-icons/ti';
import { MdMarkUnreadChatAlt } from "react-icons/md";
import Hamburger from 'hamburger-react';
import Sidebar from './Sidebar';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state: rootState) => state.user.userLogin);
  const userData = useSelector((state: rootState) => state.user.userData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleLogout = async () => {
    const response = await logout();
    console.log(response, 'logout response');
    dispatch(userLogin(null));
    dispatch(userLogout());
  };

  return (
    <>
      <nav>
        <div className="bg-white flex justify-between">
          <Link to={'/'}>
            <img src="/dreambuylogo.png" alt="DreamBuy Logo" className="h-12 mt-2 ms-2" />
          </Link>
          <ul className="items-center space-x-12 text-lg hidden xl:flex lg:flex md:flex">
            <li className="font-semibold hover:font-bold"><Link to={'/seller'}>Sell</Link></li>
            <Link to={'/homes/sale'}><li className="font-semibold hover:font-bold">Buy</li></Link>
            <Link to={'/homes/rent'}><li className="font-semibold hover:font-bold">Rent</li></Link>
            <Link to={'/about'}><li className="font-semibold hover:font-bold">About us</li></Link>
            {userStatus ?  <Link to={'/wishlist'}><li className="font-semibold hover:font-bold">Wishlist</li></Link>:<></>}          </ul>

          {/* Hamburger */}
          <div className="xl:hidden lg:hidden md:hidden flex items-center z-50">
            <Hamburger size={20} toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>

          <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} userStatus={userStatus ? true : false} />



          <div className="hidden xl:flex lg:flex md:flex items-center pe-3">
            {userStatus ? (
              <>
                {userData?.isPremium ? (
                  <>
                    <Link to={'/chat/user'} className='pe-5'><MdMarkUnreadChatAlt size={25} /></Link>
                  </>
                ) : (
                  <Link to={'/premium'} className='pe-5'>
                    <button className="bg-orange-500 rounded-xl h-10 px-4 text-white hover:shadow-lg hover:bg-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2">
                      <span className="font-serif">Get Premium</span>
                      <span className="animate-bounce">✨</span>
                    </button>
                  </Link>
                )}

                <div
                  className="relative flex items-center me-5"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <img
                    src={userData?.image || '/avatar-4.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                  />
                  <div className="flex items-center justify-center pe-6">

                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-1 top-2 mt-8 w-44 bg-white rounded-md shadow-lg z-10">
                      <button
                        className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      >
                        <Link to={'/'} className="flex items-center justify-between">
                          <span>Home</span>
                          <IoHome className="ml-2" />
                        </Link>
                      </button>
                      <button
                        className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      >
                        <Link to={'/profile'} className="flex items-center justify-between">
                          Profile
                          <FaRegUser className="ml-2" />
                        </Link>
                      </button>

                      {userData?.isPremium && <button
                        className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      >
                        <Link to={'/premium'} className="flex items-center justify-between">
                          <span className="">Premium</span>
                          <TiTick className='ml-2' />
                        </Link>
                      </button>}


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
              </>

            ) : (
              <>
                <div className='flex items-center mx-1'>
                  <div className='pe-3' onClick={() => toast.error("please login to get the premium", {
                    icon: '⚠️',
                  })}>
                    <button className="bg-orange-500 rounded-xl h-10 px-4 text-white hover:shadow-lg hover:bg-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2">
                      <span className="font-serif">Get Premium</span>
                      <span className="animate-bounce">✨</span>
                    </button>
                  </div>
                  <Link to="/login">
                    <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-4 text-center rounded">
                      Login
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
