import React from 'react';
import { Outlet } from 'react-router-dom';
import SellerSidebar from '../../components/layouts/seller/SellerSidebar';
import { useExpandContext } from '../../Context/ExpandContext';

const Mainpage: React.FC = () => {
  const {expanded} = useExpandContext()

  return (
      <div className="flex">
        <SellerSidebar />
        <div className={`flex-grow bg-gray-900 ${expanded ? 'ml-72':'ml-14'} overflow-auto`}>
          <Outlet />
        </div>
      </div>
  );
};

export default Mainpage;
