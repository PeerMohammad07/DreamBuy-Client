import { useEffect, useState } from "react";
import LocationSearch from "../common/LocationSearch";
import { useForm } from "react-hook-form";
import { addProperty } from "../../api/sellerApi";
import { useSelector } from "react-redux";
import { rootState } from "../../Redux/store/store";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { getAmenities, getCategory } from "../../api/adminApi";
import { Iaminities } from "../../pages/admin/AmenitiesManagement";
import { IoClose } from "react-icons/io5";
import { CircularProgress } from "@mui/material";


export interface PropertyFormData {
  propertyFor: "rent" | "sale" | "";
  propertyType: string;
  propertyName: string;
  state: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  expectedPrice: string;
  features: string;
  description: string;
  sqft: string;
  images: FileList;
  location: locationInterface;
  sellerId: string;
}

export interface location {
  location: string
  geometry: [number, number]
}

export interface locationInterface {
  location: string
  latitude: number
  longitude: number
}

export interface Property {
  propertyFor: "rent" | "sale" | "";
  propertyType: string;
  propertyName: string;
  state: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  expectedPrice: string;
  features: string;
  description: string;
  sqft: string;
  images: {
    base64String: string;
    fileName: string;
    fileType: string;
  }[];
  location: locationInterface;
  sellerId: string | undefined;
}

interface ICategory {
  _id: string
  name: string
  description: string
}

const AddProperty = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<ICategory[] | []>([])
  const [amenities, setAmenities] = useState<Iaminities[] | []>([])
  const [location, setLocation] = useState<location>({ location: '', geometry: [0, 0] });
  const [inputValue, setInputValue] = useState<string[]>([])

  const navigate = useNavigate();

  const seller = useSelector(
    (prevState: rootState) => prevState.seller.sellerData
  );

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await getCategory();
      const responseAmenities = await getAmenities()
      setAmenities(responseAmenities.data.amenities)
      setCategory(response.data.category);
    } catch (err) {
      console.log(err);
    }
  };

  const selectAmenitie = (ameniti: string) => {
    if (!inputValue.includes(ameniti)) {
      setInputValue((state) => [...state, ameniti])
    }
  }

  const removeAmenitie = (e: React.MouseEvent<HTMLButtonElement>, ameniti: string) => {
    e.preventDefault()
    setInputValue((state) => state.filter(item => item !== ameniti));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    defaultValues: {
      propertyFor: "",
      propertyType: "",
      propertyName: "",
      state: "",
      city: "",
      bedrooms: 0,
      bathrooms: 0,
      expectedPrice: "",
      description: "",
      features: '',
      sqft: "",
      images: {} as FileList,
    },
  });

  // converting the image files to buffer
  const fileToBase64 = (
    file: File
  ): Promise<{ base64String: string; fileName: string; fileType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = Buffer.from(reader.result as ArrayBuffer).toString(
          "base64"
        );
        resolve({
          base64String,
          fileName: file.name,
          fileType: file.type,
        });
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Add property Submit Handler
  const onSubmit = async (data: PropertyFormData) => {
    try {
      setLoading(true);
      const imageBase64Strings = await Promise.all(
        Array.from(data.images).map(fileToBase64)
      );

      console.log(data)
      const obj = {
        ...data,
        location: { location: location.location, latitude: location.geometry[1], longitude: location.geometry[0] },
        sellerId: seller?._id,
        images: imageBase64Strings,
      };
      const response = await addProperty(obj);
      if (response && response.data == "successfully added the user") {
        setLoading(false);
        navigate("/seller/");
      }
    } catch (error) {
      console.error("Error submitting property:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-screen-md">
          <h1 className="font-bold text-2xl text-center mb-8">
            Tell us about your property
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="flex gap-6 mb-8">
              <div className="flex-1">
                <label
                  htmlFor="propertyFor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Property For
                </label>
                <select
                  id="propertyFor"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("propertyFor", {
                    required: "Property for is required",
                  })}
                  defaultValue=""
                >
                  <option value="">Select Property For</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>

                {errors.propertyFor && (
                  <p className="text-red-500">{errors.propertyFor.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-6 mb-8">
              <div className="flex-1">
                <label
                  htmlFor="propertyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Property Name
                </label>
                <input
                  id="propertyName"
                  type="text"
                  placeholder="Property Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("propertyName", {
                    required: "Property name is required",
                    minLength: {
                      value: 3,
                      message: "Property name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Property name must be less than 100 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9 ]+$/,
                      message:
                        "Property name must be alphanumeric and cannot start with a number",
                    },
                  })}
                />
                {errors.propertyName && (
                  <p className="text-red-500">{errors.propertyName.message}</p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Property Type
                </label>
                <select
                  id="propertyType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("propertyType", {
                    required: "Property type is required",
                  })}
                >
                  <option value="">Select Property Type</option>
                  {
                    category.map((category) => (
                      <option key={category._id} value={category.name}>{category.name}</option>
                    ))
                  }

                </select>
                {errors.propertyType && (
                  <p className="text-red-500">{errors.propertyType.message}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <LocationSearch
              onLocationSelect={setLocation}
              prevLocation={location}
            />

            <div className="flex gap-6 mb-8">
              <div className="flex-1">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder="State"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("state", {
                    required: "State is required",
                    pattern: {
                      value: /^[a-zA-Z ]+$/,
                      message: "State must be alphabetic characters only",
                    },
                  })}
                />
                {errors.state && (
                  <p className="text-red-500">{errors.state.message}</p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("city", {
                    required: "City is required",
                    pattern: {
                      value: /^[a-zA-Z ]+$/,
                      message: "City must be alphabetic characters only",
                    },
                  })}
                />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col">
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bedrooms
                </label>
                <input
                  id="bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("bedrooms", {
                    required: "Bedrooms are required",
                    min: {
                      value: 1,
                      message: "At least 1 bedroom is required",
                    },
                  })}
                />
                {errors.bedrooms && (
                  <p className="text-red-500">{errors.bedrooms.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bathrooms
                </label>
                <input
                  id="bathrooms"
                  type="number"
                  placeholder="Bathrooms"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("bathrooms", {
                    required: "Bathrooms are required",
                    min: {
                      value: 1,
                      message: "At least 1 bathroom is required",
                    },
                  })}
                />
                {errors.bathrooms && (
                  <p className="text-red-500">{errors.bathrooms.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col">
                <label
                  htmlFor="expectedPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expected Price
                </label>
                <input
                  id="expectedPrice"
                  type="text"
                  placeholder="Expected Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("expectedPrice", {
                    required: "Expected price is required",
                  })}
                />
                {errors.expectedPrice && (
                  <p className="text-red-500">{errors.expectedPrice.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="sqft"
                  className="block text-sm font-medium text-gray-700"
                >
                  Square Feet
                </label>
                <input
                  id="sqft"
                  type="text"
                  placeholder="Square Feet"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("sqft", {
                    required: "Square feet is required",
                  })}
                />
                {errors.sqft && (
                  <p className="text-red-500">{errors.sqft.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col mb-8">
              <div className="flex flex-wrap gap-1">
                {amenities && amenities.map((ameniti) => (
                  <div
                    key={ameniti._id}
                    onClick={() => selectAmenitie(ameniti.name)}
                    className="flex-none text-sm w-1/6 p-1 bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer"
                  >
                    {ameniti.name}
                  </div>
                ))}
              </div>

              <label
                htmlFor="features"
                className="block text-sm font-medium text-gray-700"
              >
                Features
              </label>
              <div className="flex flex-wrap gap-1 mb-2">
                {inputValue.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md inline-flex items-center"
                  >
                    <span>{amenity}</span>
                    <button
                      onClick={(e) => removeAmenitie(e, amenity)}
                      className="ml-2 text-red-500"
                    >
                      <IoClose size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <input
                id="features"
                placeholder="Features"
                value={inputValue.join(', ')}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                {...register("features", {
                  minLength: {
                    value: 2,
                    message: "minimum one amenitie is required"
                  },
                  required: "Features are required",
                })}
              />
              {errors.features && (
                <p className="text-red-500">{errors.features.message}</p>
              )}
            </div>

            <div className="flex flex-col mb-8">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters long",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Description cannot exceed 1000 characters",
                  },
                })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="flex flex-col mb-8">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images
              </label>
              <input
                id="images"
                type="file"
                multiple
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                {...register("images", {
                  required: "At least one image is required",
                  validate: {
                    maxLength: (files) =>
                      files.length <= 5 || "Maximum 5 images only",
                  },
                })}
              />
              {errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
              )}
            </div>

            <div className="flex justify-center">
              {loading ? <CircularProgress  color="success" />

                : <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Property
                </button>
              }

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProperty;
