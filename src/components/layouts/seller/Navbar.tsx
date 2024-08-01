import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../Redux/store/store";
import { sellerLogout } from "../../../Redux/slice/sellerAuthSlice";
import { CgProfile } from "react-icons/cg";
import { Logout } from "../../../api/sellerApi";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { IoNotificationsCircle } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import Swal from "sweetalert2";


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sellerStatus = useSelector(
    (state: rootState) => state.seller.sellerLogin
  );
  const sellerData = useSelector((state:rootState)=> state.seller.sellerData)

  const showKycAlert = (kycStatus: string|undefined) => {
    let title = '';
    let text = '';
    let confirmButtonText = 'OK';
  
    switch (kycStatus) {
      case 'Cancelled':
        title = 'KYC Verification Cancelled';
        text = 'Your KYC verification has been cancelled. Unfortunately, you cannot add a property until this issue is resolved. Please contact support for assistance.';
        break;
      case 'Verification Pending':
        title = 'KYC Verification Pending';
        text = 'Your KYC verification is still pending. Please wait until the process is completed before you can add a property.';
        break;
      case 'Not Verified':
        title = 'KYC Verification Required';
        text = 'You need to complete the KYC verification process before you can add a property. Please complete the verification to proceed.';
        break;
      default:
        title = 'KYC Verification Status Unknown';
        text = 'An unexpected error occurred with your KYC verification status. Please try again or contact support.';
        break;
    }
  
    Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText,
      showCancelButton: false, 
      heightAuto: false,
      customClass: {
        container: 'swal-container',
      },
    });
  };

  const addProperty = ()=> {
    try {
      if(sellerData?.kycVerified != "Verified"){
       showKycAlert(sellerData?.kycVerified)       
      }else {
        navigate("/seller/addProperty")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async () => {
    const response = await Logout();
    console.log(response, "seller handle logout");
    dispatch(sellerLogout());
  };

  return (
    <>
      {sellerStatus ? (
        <nav className="h-14 flex justify-between px-6 flex-1 flex-wrap items-center bg-gray-800">
          <img src="/dreambuywhitelogo.png" alt="" className="h-12 mt-2" />
          <div className="flex justify-between items-center pe-8">
            <button onClick={addProperty} className="text-black bg-white hover:bg-orange-400 hover:text-black font-bold py-1 mr-6 px-3 rounded transition-colors duration-300">
              Add Property
            </button>
            <IoNotificationsCircle className="text-white h-10 w-10 mx-4" />
            <div
              className="relative flex justify-around px-3"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <CgProfile className="text-white text-4xl" />
              {isDropdownOpen && (
                <div className="absolute right-3 mt-8 w-44 bg-white rounded-md shadow-lg z-10">
                  <button
                    className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    <span>Home</span>
                    <IoHome className="ml-2"/>
                    </button>
                  <button
                    className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    <Link to={'/seller'}>Proile</Link>
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
          </div>
        </nav>
      ) : (
        navigate("/seller/register")
      )}
    </>
  );
};

export default Navbar;
