import { useEffect, useState } from "react";
import { deleteProperty, getMyProperty } from "../../api/sellerApi";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../Redux/store/store";
import { IProperty } from "../user/PropertyDetails";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useExpandContext } from "../../Context/ExpandContext";
import { FaAnglesUp } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEdit, MdPermDataSetting } from "react-icons/md";
import { FaBath, FaBed } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-hot-toast"
import { TbHomePlus } from "react-icons/tb";

const PropertyManagement = () => {
  const [properties, setProperties] = useState<IProperty[]>([])
  const [loading, setLoading] = useState(false)
  const userData = useSelector((prevState: rootState) => prevState.seller.sellerData)
  const { setExpanded } = useExpandContext();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchProperty = async () => {
    setLoading(true)
    const response = await getMyProperty(userData?._id, dispatch)
    setProperties(response?.data)
    setLoading(false)
  }

  const matches = useMediaQuery('(max-width:768px)');
  useEffect(() => {
    if (matches) {
      setExpanded(false);
    }
    return () => {
      setExpanded(true);
    };
  }, [setExpanded]);

  useEffect(() => {
    fetchProperty()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmation = await Swal.fire({
      title: `Delete Property ?`,
      text: `Are you sure you want to delete this proeprty?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, Delete it!`,
      cancelButtonText: "Cancel",
    });

    if (confirmation.isConfirmed) {
      const response = await deleteProperty(id, dispatch)
      if (response?.status) {
        Swal.fire(`Deleted`, `Property has been deleted`, "success");
        console.log(response)
        setProperties((prevState) => prevState.filter(property => property._id !== response.data.data._id));
      }
    }

  }

  const handleAddProperty = () => {
    navigate('/seller/addProperty')
  }

  return (
    <>
      <div className="bg-gray-900 min-h-screen py-8 px-4 sm:px-10">
        <h1 className="text-white font-bold text-3xl text-center mb-6">My Property</h1>

        {/* Property Cards */}
        {loading ? <>...Loading</> :<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties&& properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property._id}
                className="bg-gray-800 text-gray-100 rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                <img
                  src={property.propertyImage[0]}
                  alt={property.propertyName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mb-1">{property.propertyName}</h2>
                  <p className="text-gray-400 text-sm mb-3 truncate flex items-center space-x-2">
                    <FaLocationDot color="white" className="text-gray-300" />
                    <span>{property.location.location.slice(0, 30)}</span>
                  </p>
                  <div className="flex flex-wrap mb-4">
                    <span className="text-gray-300 text-sm mr-4 flex items-center space-x-1">
                      <MdPermDataSetting className="text-gray-300" />
                      <span>{property.sqft} sqft</span>
                    </span>
                    <span className="text-gray-300 text-sm mr-4 flex items-center space-x-1">
                      <FaBed className="text-gray-300" />
                      <span>{property.noOfBedroom} Beds</span>
                    </span>
                    <span className="text-gray-300 text-sm flex items-center space-x-1">
                      <FaBath className="text-gray-300" />
                      <span>{property.noOfBathroom} Baths</span>
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1 mt-auto">
                    <div className="flex gap-2">
                      <button className="bg-blue-900 text-white rounded-lg py-1 px-4 hover:bg-blue-800 transition w-full flex items-center justify-center space-x-2">
                        <MdModeEdit className="text-lg" />
                        <Link to={`/seller/editProperty/${property._id}`} className="flex-1 text-center">
                          Edit
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="bg-red-900 text-white rounded-lg py-1 px-4 hover:bg-red-800 transition w-full flex items-center justify-center space-x-2"
                      >
                        <RiDeleteBin6Fill className="text-lg" />
                        <span className="flex-1 text-center">Delete</span>
                      </button>
                    </div>
                    {property.isBoosted ? <>
                      <button onClick={() => {
                        toast.success("property already boosted ✨")
                      }} className="bg-gradient-to-b from-[#469f25] to-[#044614] rounded-lg shadow-md text-white cursor-pointer  font-sans h-10 leading-10 outline-none overflow-hidden px-5 py-0 relative text-center touch-manipulation user-select-none w-full transition-shadow duration-200 hover:shadow-lg flex items-center justify-center space-x-2">Boosted</button>
                    </> : <button
                      onClick={() => {
                        navigate(`/seller/boost/${property._id}`)
                      }}
                      className="bg-gradient-to-b from-[#e87b37] to-[#E62C03] rounded-lg shadow-md text-white cursor-pointer  font-sans h-10 leading-10 outline-none overflow-hidden px-5 py-0 relative text-center touch-manipulation user-select-none w-full transition-shadow duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <FaAnglesUp className="text-lg animate-bounce" />
                      <span className="flex-1 text-center">Boost</span>
                      <FaAnglesUp className="text-lg animate-bounce" />
                    </button>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
              <div className="mb-4">
                {/* Illustration/Icon */}
                <TbHomePlus size={50} className="text-gray-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No Properties Listed Yet</h2>
              <p className="text-gray-500 mb-6">Start by adding your first property to attract potential buyers.</p>
              <button
                onClick={handleAddProperty}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Property
              </button>
            </div>
          )}
        </div>}
      </div>
    </>
  )
}

export default PropertyManagement
