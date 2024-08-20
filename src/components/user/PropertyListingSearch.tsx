import { FaSearchLocation } from "react-icons/fa";

const PropertyListingSearch = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <form action="" className="relative inline-block ms-96">
          <input
            type="text"
            placeholder="Search Properties based on the location..."
            className="bg-white w-96 h-12 pl-4 pr-12 flex-grow rounded-full shadow-lg border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
          />
          <FaSearchLocation className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </form>
        <div>
          <button className="bg-blue-500 p-2 rounded-xl">
            Search
          </button>
        </div>
      </div>
    </>
  )
}

export default PropertyListingSearch
