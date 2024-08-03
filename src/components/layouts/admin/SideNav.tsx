import React, { useState } from "react";
import { MdMoreVert, MdChevronRight, MdChevronLeft } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { TbLayoutDashboard } from "react-icons/tb";
import Navbar from "./Navbar";
import { FaUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { RiHomeGearLine } from "react-icons/ri";


// Define the Sidebar context type
interface SidebarContextType {
  expanded: boolean;
}

// Create Sidebar context
export const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

// Define Sidebar props type
interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  return (
    <div className="flex">
      <aside
        className={`h-screen ${
          expanded ? "w-80" : "w-16"
        } transition-all bg-white border-r shadow-sm`}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-4 flex justify-between items-center">
            <img
              src="/dreambuylogo.png"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <MdChevronLeft /> : <MdChevronRight />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <SidebarItem
              icon={<TbLayoutDashboard size={20} />}
              text={"Dashboard"}
              active={location.pathname == "/admin/"}
              link={"/admin/"}
            />
            <SidebarItem
              icon={<FaUser size={20} />}
              text={"User management"}
              active={location.pathname == "/admin/user"}
              link={"/admin/user"}
            />
            <SidebarItem
              icon={<FaUserFriends size={20} />}
              text={"Seller management"}
              active={location.pathname == "/admin/seller"}
              link={"/admin/seller"}
            />
            <SidebarItem
              icon={<BiCategoryAlt size={20} />}
              text={"Category management"}
              active={location.pathname == "/admin/category"}
              link={"/admin/category"}
            />
            <SidebarItem
              icon={<IoHome size={20} />}
              text={"Property management"}
              active={location.pathname == "/admin/property"}
              link={"/admin/property"}
            />
            <SidebarItem
              icon={<RiHomeGearLine size={20}/>}
              text={"Amenties management"}
              active={location.pathname == "/admin/amenities"}
              link={"/admin/amenities"}
            />
          </SidebarContext.Provider>
        </nav>
      </aside>

      <div className="flex flex-col w-full">
        <Navbar />
        <main className="flex-grow p-4">{children}</main>
      </div>
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

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  link,
}) => {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }

  const { expanded } = context;

  return (
    <li
      className={`
        relative flex items-center py-3 px-3 my-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
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

export default Sidebar;
