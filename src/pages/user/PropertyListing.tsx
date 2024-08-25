import { useEffect, useState } from "react";
import { FaBath, FaBed, FaSearchLocation } from "react-icons/fa";
import { useParams } from "react-router-dom";
import GetCurrentLocation, { Location } from "../../components/common/GetCurrentLocation";
import Filter, { Filters } from "./Filter";
import { addToWishlist, getAllWhishlistProperty, propertyListing, removeFromWishlist } from "../../api/userApi";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import { IProperty } from "./PropertyDetails";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Link } from "react-router-dom"
import { PiHeartStraightFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcSearch } from "react-icons/fc";


// mui import 
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import CardLoading from "../../components/common/LoadingSkelton/CardLoading";
import { MdPermDataSetting } from "react-icons/md";
import { useSelector } from "react-redux";
import { rootState } from "../../Redux/store/store";
import { IWishlist } from "../../components/common/Carousel";
import toast from "react-hot-toast";
import MapboxSearch from "../../components/user/SearchBar";
import BoostCarousel from "../seller/BoostCarousel";

type ParamsType = {
  type?: string;
};

export interface location {
  location: string;
  cordinates: [number, number];
}

const PropertyListing = () => {
  const { type } = useParams<ParamsType>();
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [locationSearch, setLocationSearch] = useState<location | null>(null);
  const [sortOption, setSortOption] = useState<string>("priceAsc");
  const [whishlistProperty, setWhishlistProperty] = useState<IWishlist[] | []>([])
  const userData = useSelector((prevState: rootState) => prevState.user.userData)
  const [filters, setFilters] = useState<Filters>({
    propertyFor: type || '',
    bedrooms: '',
    bathrooms: '',
    priceRange: [0, 999999],
    category: '',
    sqft: '',
    amenities: [],
  });


  // fetching data from the backend
  const { data, isLoading } = useQuery({
    queryKey: [
      'properties',
      useDebounce(locationSearch, 500),
      useDebounce(filters, 500),
      useDebounce(sortOption, 500),
      useDebounce(location, 500)
    ],
    queryFn: () => propertyListing(JSON.stringify(location), JSON.stringify(filters), sortOption, JSON.stringify(locationSearch)),
    enabled: true,
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });


  // Sort handling the data
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };


  // finding the number of days of the property
  function getDaysDifference(isoDate: string): number {
    const currentDate = new Date();
    const createdDate = new Date(isoDate);
    // finding differnece in milli second
    const differenceInTime = currentDate.getTime() - createdDate.getTime();
    // converting milliscond to days
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    if (isNaN(differenceInDays)) {
      return 0
    }
    return differenceInDays;
  }

  // handling property type ex: sale,rent
  const handleForChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      propertyFor: e.target.value,
    }));
  };

  useEffect(() => {
    if (userData) {
      const getWishlist = async () => {
        try {
          const whishlistData = await getAllWhishlistProperty(userData?._id)
          setWhishlistProperty(whishlistData?.data)
        } catch (error) {
          console.log(error)
        }
      }
      getWishlist()
    }
  }, [])


  function isWisH(productId: string) {
    return whishlistProperty.some((whishlistData) => whishlistData.propertyId._id == productId);
  }

  const handleWhishlist = async (productId: string) => {
    try {
      const status = await isWisH(productId)
      if (status && userData?._id && productId) {
        await removeFromWishlist(userData?._id, productId);
        setWhishlistProperty(prev => prev.filter(item => item.propertyId._id !== productId));
      } else if (userData?._id) {
        const response = await addToWishlist(userData?._id, productId);
        setWhishlistProperty(prev => [...prev, response?.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationSelect = (locationData: any) => {
    const selectedLocation: location = {
      location: locationData.place_name,
      cordinates: locationData.geometry.coordinates
    };
    setLocationSearch(selectedLocation);
  };

  const premiumProperty = data?.data.filter((eachProperty:any)=> eachProperty.isBoosted == true)
  console.log(premiumProperty,"chcl")

  return (
    <div className="bg-gray-50 flex flex-col" style={{ maxHeight: "calc(100vh - 56px)" }}>

      <div className="flex justify-between items-center text-center p-3 bg-white shadow-md">
        {locationSearch ?
          <form className="relative inline-block w-full max-w-md ms-96">
            <input
              value={locationSearch.location}
              type="text"
              placeholder="Search Properties based on the location..."
              className="bg-white w-full h-12 pl-4 pr-12 flex-grow rounded-full shadow-lg border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
            />
            <AiOutlineCloseCircle onClick={() => {
              setLocationSearch(null)
            }} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </form> :
          <MapboxSearch
            onLocationSelect={handleLocationSelect}
            mapboxAccessToken="pk.eyJ1IjoiaXJmYW4zNzQiLCJhIjoiY2xwZmlqNzVyMWRuMDJpbmszdGszazMwaCJ9.7wdXsKdpOXmDR9l_ISdIqA"
          />
        }

        {/* Sort and Filter */}
        <div className="flex space-x-4">
          {/* Sort */}
          <div className="w-40">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-lg p-1"
            >
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="dateAsc">Date: Old to New</option>
              <option value="dateDesc">Date: New to Old</option>
            </select>
          </div>

          {/* Filter */}
          <div className="w-40">
            <select
              value={filters.propertyFor}
              onChange={handleForChange}
              className="border border-gray-300 rounded-lg p-1"
            >
              <option value="">Property For</option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
          </div>
        </div>
      </div>


      <div className="flex" style={{ maxHeight: "calc(100vh - 56px)" }}>
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 sticky top-0 overflow-y-auto" style={{ maxHeight: "calc(100vh - 56px)" }}>
          <Filter setFilters={setFilters} filters={filters} />
        </div>

        <div className="w-2/3 bg-gray-50 overflow-y-auto ps-3">
          <GetCurrentLocation setLocation={setLocation} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 pt-5">
            {isLoading ? (
              <div className="">
                {[...Array(6)].map((_, index) => (
                  <>
                    <div className="flex w-full">
                      <CardLoading key={index} />
                      <CardLoading key={index} />
                    </div>
                  </>
                ))}
              </div>
            ) : data?.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full w-full text-center p-5 col-span-full">
                <FcSearch size={60} />
                <h2 className="text-xl font-semibold text-gray-700 mt-3">We could not find any matching results</h2>
                <p className="text-gray-500 mt-1">Try changing your search or removing all filters.</p>
              </div>
            ) : (
              data?.data.map((property: IProperty, index: number) => (
                <>
                  {premiumProperty.length > 0 && index > 0 && index % 6 == 0 ?
                    <div className="col-span-full">
                      <BoostCarousel premiumProperty={premiumProperty.slice(index-6,index)}/>
                    </div> : <Link to={`/propertyDetails?id=${property._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Card sx={{ width: 400, maxWidth: '100%', boxShadow: 'lg', position: 'relative' }} key={property._id}>
                        <CardOverflow>
                          <AspectRatio sx={{ minWidth: 200, position: 'relative' }}>
                            <img src={property.propertyImage[0]} loading="lazy" alt="" />
                            <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
                              {getDaysDifference(property.createdAt)} days in DreamBuy
                            </div>
                            {isWisH(property._id) ? (
                              <PiHeartStraightFill
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  userData ? handleWhishlist(property._id) : toast.error("please login before add to wishlist");
                                }}
                                className="absolute top-2 right-2"
                                color="white"
                                size="30px"
                              />
                            ) : (
                              <FaRegHeart
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  userData ? handleWhishlist(property._id) : toast.error("please login before add to wishlist");
                                }}
                                className="absolute top-2 right-2"
                                color="white"
                                size="30px"
                              />
                            )}
                          </AspectRatio>
                        </CardOverflow>
                        <CardContent>
                          <Typography level="title-lg" sx={{ mt: 1, fontWeight: 'lg' }} color="neutral">
                            {property.propertyName}
                          </Typography>
                          <Typography level="title-lg" sx={{ mt: 1, fontWeight: 'xl' }}>
                            Price : ₹{property.Price}
                          </Typography>
                          <Typography level="body-sm">
                            <div className="flex items-center mb-2">
                              <FaBed className="mx-2" /> {property.noOfBedroom}
                              <FaBath className="mx-2" /> {property.noOfBathroom}
                              <MdPermDataSetting className="mx-2" /> {property.sqft}
                            </div>
                          </Typography>
                          <Typography level="body-md" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaLocationCrosshairs />
                            location: {property.location.location.slice(0, 30)}...
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  }

                </>
              ))
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default PropertyListing;
