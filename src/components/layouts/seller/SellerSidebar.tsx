import React, { useState } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiHomeGearLine, RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../Redux/store/store";
import { sellerLogout } from "../../../Redux/slice/sellerAuthSlice";
import { Logout } from "../../../api/sellerApi";
import Swal from "sweetalert2";

export const SidebarContext = React.createContext<{ expanded: boolean } | undefined>(undefined);

interface SidebarProps {
  children?: React.ReactNode;
}

const SellerSidebar: React.FC<SidebarProps> = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sellerStatus = useSelector((state: rootState) => state.seller.sellerLogin);
  const sellerData = useSelector((state: rootState) => state.seller.sellerData);

  const handleLogout = async () => {
    const response = await Logout();
    console.log(response, "seller handle logout");
    dispatch(sellerLogout());
  };

  const showKycAlert = (kycStatus: string | undefined) => {
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

  const addProperty = () => {
    try {
      if (sellerData?.kycVerified !== "Verified") {
        showKycAlert(sellerData?.kycVerified);
      } else {
        navigate("/seller/addProperty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!sellerStatus) {
    navigate("/seller/register");
    return null;
  }

  return (
    <div className="fixed h-full bg-gray-800 border-r border-gray-700 shadow-sm w-72">
      <aside className={`h-full ${expanded ? "w-72" : "w-16"} transition-all`}>
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-4 flex justify-between items-center">
            <img
              src="/dreambuywhitelogo.png"
              className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
              alt=""
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
            >
              {expanded ? <MdChevronLeft /> : <MdChevronRight />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <SidebarItem
              icon={<FaUser size={20} />}
              text={"Profile"}
              active={location.pathname === "/seller/profile"}
              link={"/seller/"}
            />
            <div onClick={addProperty}>
              <SidebarItem
                icon={<IoHome size={20} />}
                text={"Add Property"}
                active={location.pathname === "/seller/addProperty"}
                link={"/seller/"}
              />
            </div>
            <SidebarItem
              icon={<RiHomeGearLine size={20} />}
              text={"Property Management"}
              active={location.pathname === "/seller/property"}
              link={"/seller/property"}
            />
          </SidebarContext.Provider>

          <div className="mt-auto p-4 flex flex-col items-center border-t border-gray-700">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center">
                <img
                  src={sellerData?.image || "/avatar-4.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover mb-2"
                />
                {expanded && (
                  <span className="text-white ml-4 mb-2">{sellerData?.name}</span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-300 hover:text-red-500 mt-2"
            >
              <RiLogoutCircleLine size={20} />
              {expanded && <span className="ml-2">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
};

// Sidebar Item Component
interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  link: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, link }) => {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }

  const { expanded } = context;

  return (
    <li
      className={`relative flex items-center py-3 px-3 my-2 font-medium rounded-md cursor-pointer transition-colors group
        ${active ? "bg-indigo-600 text-white" : "hover:bg-indigo-500 text-gray-300"}`}
    >
      {icon}
      <Link
        to={link}
        className={`overflow-hidden transition-all ${expanded ? "ml-3" : "w-0"}`}
      >
        <span>{text}</span>
      </Link>
    </li>
  );
};

export default SellerSidebar;
