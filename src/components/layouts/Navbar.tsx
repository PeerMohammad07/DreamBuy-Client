// import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="h-18 flex justify-between px-6 flex-1 flex-wrap items-center">
          <img src="/dreambuylogo.png" alt="" className="h-12 mt-2" />
          <ul className="hidden xl:flex lg:flex justify-between ps-8 sm:hidden md:hidden">
            <li className="font-medium px-7">Sell</li>
            <li className="font-medium px-7">Buy</li>
            <li className="font-medium px-7">Rent</li>
            <li className="text-1xl font-medium px-4">About us</li>
            <li className="text-1xl font-medium px-4">Contact us</li>
          </ul>
          <div className="flex justify-between pe-8">
            <div className="flex justify-around px-3">
              <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-4 text-center rounded ">
                Login
              </button>
            </div>
            <div>
           </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
