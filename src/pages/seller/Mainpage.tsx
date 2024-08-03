import { Outlet } from 'react-router-dom';
import SellerSidebar from '../../components/layouts/seller/SellerSidebar';

const Mainpage = () => {
  return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-grow ml-72 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Mainpage;
