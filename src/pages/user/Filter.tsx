import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { getAmenities, getCategory } from '../../api/adminApi';
import { Iaminities } from '../admin/AmenitiesManagement';
import { GrFormRefresh } from "react-icons/gr";


export interface Filters {
  propertyFor: string;
  bedrooms: string;
  bathrooms: string;
  priceRange: [number, number];
  category: string;
  sqft: string;
  amenities: string[];
}

interface category {
  _id: string,
  name: string
}

interface FilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

type SliderValue = [number, number];

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {

  const [amenities, setAmenities] = useState<Iaminities[] | []>([])
  const [category, setCategory] = useState<category[] | []>([])

  useEffect(() => {
    const fetchExistData = async () => {
      try {
        const AllAmeniti = await getAmenities()
        const AllCategory = await getCategory()
        setAmenities(AllAmeniti.data.amenities)
        setCategory(AllCategory.data.category)
      } catch (error) {
        console.log(error)
      }
    }
    fetchExistData()
  }, [])

  const handleSelectBedroom = (bedroom: string) => {
    setFilters(prev => ({ ...prev, bedrooms: bedroom }));
  };

  const handleSelectBathroom = (bathroom: string) => {
    setFilters(prev => ({ ...prev, bathrooms: bathroom }));
  };

  const handlePriceChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (Array.isArray(newValue)) {
      setFilters(prev => ({ ...prev, priceRange: newValue as SliderValue }));
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, category: event.target.value }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFilters(prev => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: newAmenities };
    });
  };


  const valuetext = (value: number) => `$${value}`;

  const defaultFilters: Filters = {
    propertyFor: '',
    bedrooms: '',
    bathrooms: '',
    priceRange: [0, 999999],
    category: '',
    sqft: '',
    amenities: [],
  };

  return (
    <>
      <div className="flex justify-between items-center px-4">
        <h1 className="text-2xl font-serif text-blue-600 text-center flex-grow">Filter</h1>
        <button onClick={()=>{
          setFilters(defaultFilters)  
        }} className="text-sm px-2 py-1 border rounded flex items-center gap-1 text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out">
          <GrFormRefresh className="text-base" />
          Reset
        </button>
      </div>


      {/* Price Range */}
      <div className="p-4">
        <h3 className="text-gray-500 text-lg">Price Range</h3>
        <div className="w-72">
          <Slider
            getAriaLabel={() => 'Price range'}
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={999999}
            disableSwap
          />
        </div>
        <div className="mt-2">
          <h2 className="text-gray-500 text-sm">Selected Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}</h2>
        </div>
      </div>

      {/* Property Type */}
      <div className="p-3">
        <h1 className="text-gray-500 text-sm font-bold">Property Type</h1>
        <div className="flex flex-wrap gap-2 mt-5">
          {category.map((cate) => (
            <div key={cate._id} className="flex items-center">
              <input
                type="radio"
                id={cate._id}
                name="propertyCategory"
                value={cate.name}
                checked={filters.category === cate.name}
                onChange={handleCategoryChange}
                className="form-radio h-5 w-5 text-gray-500 checked:text-gray-700"
              />
              <label htmlFor={cate.name} className="ml-2 text-gray-500 text-sm">{cate.name}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Bedroom Option */}
      <div className="p-4 rounded-lg">
        <h1 className="text-gray-700 text-sm font-semibold mb-1">Bedrooms</h1>
        <div className="flex flex-wrap gap-2">
          {["1BR", "2BR", "3BR", "4BR", "5BR+"].map((bedroom) => (
            <div
              key={bedroom}
              onClick={() => handleSelectBedroom(bedroom)}
              className={`cursor-pointer py-1 px-3 rounded ${filters.bedrooms === bedroom ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-900'} transition duration-300 ease-in-out hover:bg-blue-400`}
            >
              {bedroom}
            </div>
          ))}
        </div>
      </div>

      {/* Bathroom Options */}
      <div className="px-4 rounded-lg">
        <h1 className="text-gray-700 text-sm font-semibold mb-2">Bathrooms</h1>
        <div className="flex flex-wrap gap-2">
          {["1BA", "2BA", "3BA", "4BA", "5BA+"].map((bathroom) => (
            <div
              key={bathroom}
              onClick={() => handleSelectBathroom(bathroom)}
              className={`cursor-pointer py-1 px-3 rounded ${filters.bathrooms === bathroom ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-900'} transition duration-300 ease-in-out hover:bg-blue-400`}
            >
              {bathroom}
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-5 ms-3">
        <h1 className="text-gray-700 text-lg font-semibold">Select Required Amenities</h1>
        <div className="flex flex-wrap gap-4 mt-2">
          {amenities.map((amenity) => (
            <div key={amenity._id} className="flex items-center">
              <input
                type="checkbox"
                id={amenity._id}
                checked={filters.amenities.includes(amenity.name)}
                onChange={() => handleAmenityChange(amenity.name)}
                className="form-checkbox h-5 w-5 text-gray-500 checked:text-gray-700"
              />
              <label htmlFor={amenity.name} className="ml-2 text-gray-500 text-sm">{amenity.name}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
