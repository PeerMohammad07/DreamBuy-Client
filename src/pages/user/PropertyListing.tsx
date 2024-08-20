import { useEffect, useState } from "react";
import { FaBath, FaBed, FaSearchLocation } from "react-icons/fa";
import { useParams } from "react-router-dom";
import GetCurrentLocation, { Location } from "../../components/common/GetCurrentLocation";
import Filter, { Filters } from "./Filter";
import { propertyListing } from "../../api/userApi";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import { IProperty } from "./PropertyDetails";
import { FaLocationCrosshairs } from "react-icons/fa6";


// mui import 
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import CardLoading from "../../components/common/LoadingSkelton/CardLoading";
import { MdPermDataSetting } from "react-icons/md";

type ParamsType = {
  type?: string;
};

const PropertyListing = () => {
  const { type } = useParams<ParamsType>();
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [locationSearch, setLocationSearch] = useState<string | undefined>(undefined);
  const [sortOption, setSortOption] = useState<string>("priceAsc");
  const [filters, setFilters] = useState<Filters>({
    propertyFor: type || '',
    bedrooms: '',
    bathrooms: '',
    priceRange: [0, 999999],
    category: '',
    sqft: '',
    amenities: [],
  });
  const { data, isLoading } = useQuery({
    queryKey: [
      'properties',
      useDebounce(locationSearch, 500),
      useDebounce(filters, 500),
      useDebounce(sortOption, 500),
      useDebounce(location, 500)
    ],
    queryFn: () => propertyListing(JSON.stringify(location), JSON.stringify(filters), sortOption),
    enabled: true,
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

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

  const handleForChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      propertyFor: e.target.value,
    }));
  };


  return (
    <div className="bg-gray-50 flex flex-col" style={{ maxHeight: "calc(100vh - 56px)" }}>
      {/* Search and Sort Section */}
      <div className="flex justify-between items-center text-center p-3 bg-white shadow-md ps-72">
        <form className="relative inline-block w-full max-w-xl">
          <input
            type="text"
            placeholder="Search Properties based on the location..."
            className="bg-white w-full h-12 pl-4 pr-12 flex-grow rounded-full shadow-lg border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
          />
          <FaSearchLocation className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </form>
        <div>
          <div className="w-40 ms-10">
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

        </div>
        <div className="w-40 ms-4">
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

      <div className="flex" style={{ maxHeight: "calc(100vh - 56px)" }}>
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 sticky top-0 overflow-y-auto" style={{ maxHeight: "calc(100vh - 56px)" }}>
          <Filter setFilters={setFilters} filters={filters} />
        </div>

        <div className="w-2/3 bg-gray-50 overflow-y-auto ps-3">
          <GetCurrentLocation setLocation={setLocation} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 pt-5">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {[...Array(6)].map((_, index) => (
                  <CardLoading key={index} />
                ))}
              </div>
            ) : (
              data?.data.map((property: IProperty) => (
                <Card sx={{ width: 400, maxWidth: '100%', boxShadow: 'lg', position: 'relative' }} key={property._id}>
                  <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200, position: 'relative' }}>
                      <img src={property.propertyImage[0]} loading="lazy" alt="" />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
                        {getDaysDifference(property.createdAt)} days in DreamBuy
                      </div>
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent>
                    <Link fontWeight="lg" color="neutral" textColor="text.primary" overlay>
                      {property.propertyName}
                    </Link>
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

              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
