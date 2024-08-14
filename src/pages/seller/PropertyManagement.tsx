import { useEffect, useState } from "react";
import { deleteProperty, getMyProperty } from "../../api/sellerApi";
import { useSelector } from "react-redux";
import { rootState } from "../../Redux/store/store";
import { IProperty } from "../user/PropertyDetails";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

const PropertyManagement = () => {
  const [properties, setProperties] = useState<IProperty[]>([])
  const [loading, setLoading] = useState(false)
  const userData = useSelector((prevState: rootState) => prevState.seller.sellerData)

  const fetchProperty = async () => {
    setLoading(true)
    const response = await getMyProperty(userData?._id)
    setProperties(response?.data)
    setLoading(false)
  }

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
      const response = await deleteProperty(id)
      if (response?.status) {
        Swal.fire(`Deleted`, `Property has been deleted`, "success");
        fetchProperty();
      }
    }

  }

  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <div className="mx-10 mt-10">
          <div>
            <h1 className="font-bold text-2xl text-center text-white mb-4">My Property</h1>
          </div>

          {loading ? <>
            <div className="grid grid-cols-1gap-6 pt-5">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start bg-gray-300 rounded-lg w-full p-4 sm:p-6 mb-6 sm:h-40"
                >
                  <Skeleton variant="circular" width={150} height={100} className="rounded" />
                  <div className="flex flex-col justify-between ml-0 sm:ml-6 w-full sm:w-auto text-left">
                    <Skeleton variant="text" width={700} height={30} />
                    <Skeleton variant="text" width={200} height={20} />
                    <div className="flex flex-wrap mt-2">
                      <Skeleton variant="text" width={80} height={20} className="mr-4" />
                      <Skeleton variant="text" width={60} height={20} className="mr-4" />
                      <Skeleton variant="text" width={60} height={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </> :
            (<>
              {properties && properties.length > 0 && properties.map((property: IProperty) => (
                <div
                  key={property._id}
                  className="flex flex-col sm:flex-row justify-between items-start bg-white rounded-lg w-full p-4 sm:p-6 mb-6 sm:h-40"
                >
                  <img
                    src={property.propertyImage[0]}
                    alt="Property"
                    className="rounded h-32 w-full sm:h-full sm:w-48 object-cover"
                  />

                  <div className="flex flex-col justify-between ml-0 sm:ml-6 w-full sm:w-auto text-left">
                    <h1 className="text-lg font-semibold">{property.propertyName}</h1>
                    <h2 className="text-sm text-gray-600 truncate mt-1">{property.location.location.substring(0, 50)}</h2>
                    <div className="flex flex-wrap mt-2">
                      <span className="text-sm text-gray-600 mr-4">{property.sqft} sqft</span>
                      <span className="text-sm text-gray-600 mr-4">{property.noOfBedroom} Beds</span>
                      <span className="text-sm text-gray-600">{property.noOfBathroom} Baths</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-auto mt-4 sm:mt-0">
                    <Link to={`/seller/editProperty/${property._id}`}>
                      <button className="rounded bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-900 text-white py-2 w-full sm:w-24">
                        Edit
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(property._id)} className="rounded bg-gradient-to-tr from-red-700 via-red-500 to-red-700 py-2 relative w-full sm:w-24">
                      Delete
                    </button>
                  </div>
                </div>

              ))}</>)
          }
        </div>
      </div>
    </>
  )
}

export default PropertyManagement
