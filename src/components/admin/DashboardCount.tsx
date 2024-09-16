import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { PiHouseLineBold } from "react-icons/pi";
import { GiHouse } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";


interface counts {
  noOfAmenities: number
  noOfCategories: number
  noOfRentProperties: number
  noOfSaleProperties: number
  noOfSellers: number
  noOfUsers: number
  noOfPremiumUsers: number,
  totalRevenue: [{ sum: number }]
}

interface props {
  countData: counts
}

const DashboardCount: React.FC<props> = ({ countData }) => {

  return (
    <>
      <div className="mx-4 sm:mx-6 lg:mx-10 my-5">
        {countData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 pt-5">
              <div className="shadow-xl bg-white p-4 rounded-lg flex items-center shakeDiv">
                <div className="rounded-full bg-gray-600 p-3">
                  <LuUsers2 className="text-white text-2xl" />
                </div>
                <div className="ml-4">
                  <h1 className="text-lg font-rounded text-gray-700">Users</h1>
                  <h1 className="text-3xl font-extrabold font-rounded text-gray-900">
                    <span className="text-xl">{countData.noOfUsers}</span>
                  </h1>
                  <p className="text-gray-400 text-sm">No of Users</p>
                </div>
              </div>

              <div className="shadow-xl bg-white p-4 rounded-lg flex items-center shakeDiv">
                <div className="rounded-full bg-gray-600 p-3">
                  <FaUsers className="text-white text-2xl" />
                </div>
                <div className="ml-4">
                  <h1 className="text-lg font-rounded text-gray-700">Sellers</h1>
                  <h1 className="text-3xl font-extrabold font-rounded text-gray-900">
                    <span className="text-xl">{countData.noOfSellers}</span>
                  </h1>
                  <p className="text-gray-400 text-sm">No of Sellers</p>
                </div>
              </div>

              <div className="shadow-xl bg-white p-4 rounded-lg flex items-center shakeDiv">
                <div className="rounded-full bg-gray-600 p-3">
                  <PiHouseLineBold className="text-white text-2xl" />
                </div>
                <div className="ml-4">
                  <h1 className="text-lg font-rounded text-gray-700">Rent </h1>
                  <h1 className="text-3xl font-extrabold font-rounded text-gray-900">
                    <span className="text-xl">{countData.noOfAmenities}</span>
                  </h1>
                  <p className="text-gray-400 text-sm">No of Rent properties</p>
                </div>
              </div>

              <div className="shadow-xl bg-white p-4 rounded-lg flex items-center shakeDiv">
                <div className="rounded-full bg-gray-600 p-3">
                  <GiHouse className="text-white text-2xl" />
                </div>
                <div className="ml-4">
                  <h1 className="text-lg font-rounded text-gray-700">Sale </h1>
                  <h1 className="text-3xl font-extrabold font-rounded text-gray-900">
                    <span className="text-xl">{countData.noOfRentProperties}</span>
                  </h1>
                  <p className="text-gray-400 text-sm">No of Sale properties</p>
                </div>
              </div>
            </div>

            {/* differentiate */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 pt-5">
              <div className="shadow-xl bg-white p-4 rounded-lg flex items-center shakeDiv">
                <div className="rounded-full bg-gray-600 p-3">
                  <MdCategory className="text-white text-2xl" />
                </div>
                <div className="ml-4">
                  <h1 className="text-lg font-rounded text-gray-700">Amenities</h1>
                  <h1 className="text-3xl font-extrabold font-rounded text-gray-900">
                    <span className="text-xl">{countData.noOfAmenities}</span>
                  </h1>
                  <p className="text-gray-400 text-sm">No of amenities</p>
                </div>
              </div>

              <div className="shadow-xl bg-white p-4 rounded-lg flex items-center shakeDiv">
                <div className="rounded-full bg-gray-600 p-3">
                  <BiCategoryAlt className="text-white text-2xl" />
                </div>
                <div className="ml-4">
                  <h1 className="text-lg font-rounded text-gray-700">Category</h1>
                  <h1 className="text-3xl font-extrabold font-rounded text-gray-900">
                    <span className="text-xl">{countData.noOfCategories}</span>
                  </h1>
                  <p className="text-gray-400 text-sm">No of category</p>
                </div>
              </div>

              <div className="shadow-xl bg-white p-4 rounded-lg flex items-center shakeDiv">
                <div className="rounded-full bg-gray-600 p-3">
                  <RiMoneyRupeeCircleFill className="text-white text-2xl" />
                </div>
                <div className="ml-4">
                  <h1 className="text-lg font-rounded text-gray-700">Revenue</h1>
                  <h1 className="text-3xl font-extrabold font-rounded text-gray-900">
                    <span className="text-xl">{countData.totalRevenue[0].sum}</span>
                  </h1>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                </div>
              </div>

              <div className="shadow-xl bg-white p-4 rounded-lg flex items-center shakeDiv">
                <div className="rounded-full bg-gray-600 p-3">
                  <MdOutlineWorkspacePremium className="text-white text-2xl" />
                </div>
                <div className="ml-4">
                  <h1 className="text-lg font-rounded text-gray-700">Premium Users </h1>
                  <h1 className="text-3xl font-extrabold font-rounded text-gray-900">
                    <span className="text-xl">{countData.noOfPremiumUsers}</span>
                  </h1>
                  <p className="text-gray-400 text-sm">No of premium users</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </>
  );
};

export default DashboardCount;
