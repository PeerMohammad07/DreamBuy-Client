import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToWishlist, getAllWhishlistProperty, productDetail, removeFromWishlist, sendOwnerDetails } from "../../api/userApi";
import 'mapbox-gl/dist/mapbox-gl.css';

// icons
import { FaRegClock } from "react-icons/fa";
import { FaBath, FaBed, FaCar, FaHeart, FaRegHeart, FaSwimmer } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { MdFitnessCenter, MdLocalLaundryService, MdOutlineSecurity, MdPermDataSetting } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { IoIosWifi, IoMdArrowRoundBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import toast from "react-hot-toast";
import { IWishlist, location } from "../../components/common/Carousel";
import { rootState } from "../../Redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/user/Modal";
import GetOwnerDetails from "../../components/user/GetOwnerDetails";
import { createConversation } from "../../api/chatApi";
import LoginModal from "../../components/common/LoginModal";
import { setCurrentUserId } from "../../Redux/slice/chatCurrentUserSlice";
import { TbSunElectricity } from "react-icons/tb";
import { GiLift } from "react-icons/gi";
import { PiThermometerHot } from "react-icons/pi";

mapboxgl.accessToken = 'pk.eyJ1IjoiaXJmYW4zNzQiLCJhIjoiY2xwZmlqNzVyMWRuMDJpbmszdGszazMwaCJ9.7wdXsKdpOXmDR9l_ISdIqA'

export interface IProperty {
  _id: string;
  propertyFor: "sale";
  propertyType: string;
  propertyName: string;
  state: string;
  city: string;
  noOfBedroom: number;
  noOfBathroom: number;
  price: string;
  features: string[];
  description: string;
  sqft: string;
  propertyImage: string[];
  location: location;
  sellerId: string;
  createdAt: string;
  isBoosted:boolean
}

const PropertyDetails = () => {

  const featureIconMap: any = {
    'Swimming pool': <FaSwimmer size={25} className="text-blue-500" />,
    '24/7 Security': <MdOutlineSecurity size={25} className="text-red-500" />,
    'Car Parking': <FaCar size={25} className="text-gray-700" />,
    'Electrecity and solar': <TbSunElectricity size={25} className="text-yellow-500" />,
    'Laundry Facilities': <MdLocalLaundryService size={25} />,
    'Fitness Center': <MdFitnessCenter size={25} />,
    'Elevator Access': <GiLift size={25} />,
    'Heating': <PiThermometerHot size={25} />,
    'Wi-Fi': <IoIosWifi size={25} />
  };

  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const query = new URLSearchParams(location.search);
  const [whishlistProperty, setWhishlistProperty] = useState<IWishlist[] | []>([])
  const userData = useSelector((prevState: rootState) => prevState.user.userData)
  const [isWhish, setIswish] = useState<boolean>(false)
  const [product, setProduct] = useState<IProperty | null>(null);
  const id = query.get('id');
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false)
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const featureRef = useRef<HTMLDivElement | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getOwnerDetails, setGetOwnerDetails] = useState(false)
  const [loginModal, setLoginModal] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchProductDetail = async () => {
      if (id) {
        try {
          setLoading(true)
          const response = await productDetail(id);
          if(!response.data.status&&response.data.message=="Property has been blocked"){
            console.log(response.data.message)
            navigate("/")
            toast.error("Property has been blocked")
            return
          }
          setProduct(response.data.data);
          setMainImage(response.data.data.propertyImage[0]);
          setLoading(false)
        } catch (error) {
          console.error('Failed to fetch product details:', error);
          setLoading(false)
        }
      }
    };
    
    fetchProductDetail();
  }, [id]);


  useEffect(() => {
    if (userData) {
      const getWishlist = async () => {
        try {
          const whishlistData = await getAllWhishlistProperty(userData?._id,dispatch)
          setWhishlistProperty(whishlistData?.data)
        } catch (error) {
          console.log(error)
        }
      }

      getWishlist()
    }
  }, [])

  useEffect(() => {
    if (whishlistProperty.length > 0) {
      const isWishlisted = whishlistProperty.some((whishlistData) => {
        return whishlistData.propertyId._id === product?._id;
      });
      setIswish(isWishlisted);
    } else {
      setIswish(false);
    }
  }, [whishlistProperty, product?._id]);

  const handleWhishlist = async (productId: string | undefined) => {
    try {
      if (isWhish && userData?._id && productId) {
        await removeFromWishlist(userData?._id, productId,dispatch);
        toast.success("removed from wishlist")
        setWhishlistProperty(prev => prev.filter(item => item.propertyId._id !== productId));
      } else if (userData?._id) {
        const response = await addToWishlist(userData?._id, productId,dispatch);
        toast.success("added to wishlist")
        setWhishlistProperty(prev => [...prev, response?.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDaysAgo = (createdAt: any) => {
    const now: any = new Date();
    const createdDate: any = new Date(createdAt);
    const diffInMilliseconds = now - createdDate;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    return diffInDays;
  };

  useEffect(() => {
    if (product && mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [product.location.longitude, product.location.latitude],
        zoom: 15
      });

      const marker = new mapboxgl.Marker()
        .setLngLat([product.location.longitude, product.location.latitude])
        .addTo(map);

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.resize();

      return () => {
        marker.remove()
        map.remove();
      }
    }
  }, [product]);

  const copyUrl = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.success("URL copied");
    } catch (error) {
      console.error(error);
    }
  }

  const contactOwnerHandle = async (sellerId: string | undefined) => {
    try {
      const response = await createConversation(userData?._id, sellerId,dispatch)
      if (response.data && response.status && sellerId) {
        dispatch(setCurrentUserId(sellerId))
      }
      navigate('/chat/user')
    } catch (error) {
      console.error(error);
    }
  }



  const handleSendOwnerDetails = async () => {
    if (userData?.isPremium) {
      try {
        setGetOwnerDetails(true);
        const sellerId = product?.sellerId;
        console.log(userData.email)
        await sendOwnerDetails(userData?.name, product, sellerId, userData?.email,dispatch);
      } catch (error) {
        console.error('Failed to send owner details:', error);
      }
    } else {
      setIsModalOpen(true);
    }
  };



  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const ownerDetailsModalClose = () => {
    setGetOwnerDetails(false);
  };

  return (
    <>
      {loading ? <div className="animate-pulse p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="space-y-4 mb-8">
          <div className="h-64 bg-gray-300 rounded w-full"></div>
          <div className="flex space-x-4">
            <div className="h-32 bg-gray-300 rounded w-1/4"></div>
            <div className="h-32 bg-gray-300 rounded w-1/4"></div>
            <div className="h-32 bg-gray-300 rounded w-1/4"></div>
            <div className="h-32 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        </div>

        {/* Description */}
        <div className="mt-8 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
        </div>

        {/* Amenities */}
        <div className="mt-8 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="flex flex-wrap space-x-4">
            <div className="h-10 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-1/4 mb-2"></div>
          </div>
        </div>
      </div> :
        <> <div className="sticky top-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 border-t border-b border-gray-200 bg-white">
        <Link to={'/homes/'}>
          <h1 className="flex justify-center items-center p-1 sm:p-2 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
            <IoMdArrowRoundBack className="mr-2" /> Feed
          </h1>
        </Link>
        <h1 onClick={() => {
          imageRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }} className="flex justify-center items-center p-1 sm:p-2 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
          Overview
        </h1>
        <h1 onClick={() => {
          aboutRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }} className="flex justify-center items-center p-1 sm:p-2 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
          About 
        </h1>
        <h1 onClick={() => {
          featureRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }} className="flex justify-center items-center p-1 sm:p-2 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
          Features
        </h1>
        <h1 className="flex justify-center items-center p-1 sm:p-2 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
          {isWhish ? <FaHeart className='text-red-500 mr-2' onClick={() => handleWhishlist(product?._id)} /> : <FaRegHeart className="mr-2" onClick={() => handleWhishlist(product?._id)} />
          } Wishlist
        </h1>
        <h1 onClick={copyUrl} className="flex justify-center items-center p-1 sm:p-2 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
          <FaRegCopy className="mr-2" />
          Copy Url
        </h1>
      </div>
      
      


          <div className="container mx-auto p-4" ref={imageRef}>
            {product && (
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 lg:w-2/3">
                  <img
                    src={mainImage}
                    className="w-full h-72 lg:h-96 object-cover rounded-lg"
                    alt="Main property"
                  />
                </div>

                <div className="lg:w-1/3 flex flex-col gap-4">
                  {product.propertyImage.length > 1 && (
                    <div className="grid grid-cols-2 gap-4">
                      {product.propertyImage.map((image, index) => (
                        mainImage != image ?
                          <div
                            key={index}
                            onClick={() => setMainImage(image)}
                            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                          >
                            <img
                              src={image}
                              className="w-full h-24 lg:h-32 object-cover"
                              alt={`Property image ${index + 1}`}
                            />
                          </div> : <></>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="container mx-auto px-2 ps-6 flex flex-col lg:flex-row gap-4">
            {/* Property Details Section */}
            <div className="flex-1">
              <div className="pt-5 flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                  {product?.propertyName}
                </h1>
                <h2 className="flex items-center text-lg font-medium mt-2 lg:mt-0">
                  For {product?.propertyFor} - Active <GoDotFill color="green" className="ml-2" />
                </h2>
              </div>

              <div className="py-4 flex items-center space-x-2">
                <FaRegClock className="text-xl" />
                <h1 className="text-lg">
                  {calculateDaysAgo(product?.createdAt)} Days in DreamBuy
                </h1>
              </div>

              <div className="py-4">
                <div className="flex flex-wrap gap-6">
                  <h2 className="text-2xl font-bold">₹{product?.price}</h2>
                  <div className="flex items-center">
                    <FaBed className="mr-2 text-xl" /> {product?.noOfBedroom} Beds
                  </div>
                  <div className="flex items-center">
                    <FaBath className="mr-2 text-xl" /> {product?.noOfBathroom} Baths
                  </div>
                  <div className="flex items-center">
                    <MdPermDataSetting className="mr-2 text-xl" /> {product?.sqft} sqft
                  </div>
                </div>
              </div>

              <div className="flex items-center text-lg gap-4 py-4">
                <FaLocationDot className="mr-2" /> {product?.location.location}
              </div>
            </div>

            {/* "Thinking of Buying" Section */}
            <div className="w-full lg:w-1/3 border-black border rounded-xl mt-6 lg:mt-0">
              <h1 className="text-2xl font-bold text-center py-5">Thinking of Buying ❓</h1>
              <div className="p-6">
                <button
                  onClick={() => {
                    userData ? userData?.isPremium ? handleSendOwnerDetails() : setIsModalOpen(true) : setLoginModal(true);
                  }}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Get Owner Details
                </button>
                <p className="text-center text-xl px-5 font-serif">OR</p>
                <button
                  onClick={() => {
                    userData ? userData?.isPremium ? contactOwnerHandle(product?.sellerId) : setIsModalOpen(true) : setLoginModal(true);
                  }}
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
                >
                  Contact Owner
                </button>
                <p className="text-center text-sm mt-2 text-gray-600">
                  Contacting the owner allows you to have a detailed chat or video call to learn more about the property.
                </p>
              </div>
            </div>
          </div>


          <LoginModal open={loginModal} onClose={setLoginModal} />
          <GetOwnerDetails isOpen={getOwnerDetails} onClose={ownerDetailsModalClose} email={userData?.email} />
          <Modal isOpen={isModalOpen} onClose={handleModalClose} />

          <div className="ps-6" ref={aboutRef}>
            <div>
              <h1 className="text-3xl font-bold">About Property</h1>
              <p className="pt-6">{product?.description}</p>
            </div>
          </div>

          <div className="ps-6 pt-7" ref={featureRef}>
            <h1 className="font-bold text-3xl font-rounded">Features</h1>
            <div className="bg-gray-200 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                {product?.features.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center bg-white p-4 rounded-lg shadow-md"
                  >
                    <p className="flex-1">{feature}</p>
                    <div className="ml-4">
                      {featureIconMap[feature] || <span className="text-gray-500"></span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="h-5 mx-2 mt-10 border-t-2" />
          </div>

          <div className="relative overflow-hidden py-5 px-5">
            <h1 className="text-3xl font-bold mb-4">Map</h1>
            <div ref={mapContainer} className="w-full h-[70vh] bg-gray-200 rounded-lg border border-gray-300" />
          </div>
        </>}
    </>
  );
};

export default PropertyDetails;