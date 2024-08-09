import { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { productDetail, sendOwnerDetails } from "../../api/userApi";

// icons
import { FaBath, FaBed, FaRegHeart } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { MdPermDataSetting } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import toast from "react-hot-toast";
import { location } from "../../components/common/PropertyCard";
import { rootState } from "../../Redux/store/store";
import { useSelector } from "react-redux";
import Modal from "../../components/user/Modal";
import GetOwnerDetails from "../../components/user/GetOwnerDetails";
import { createConversation } from "../../api/chatApi";

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
  Price: string;
  features: string;
  description: string;
  sqft: string;
  propertyImage: string[];
  location: location;
  sellerId: string;
}

const PropertyDetails = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userData = useSelector((prevState: rootState) => prevState.user.userData)
  const [product, setProduct] = useState<IProperty | null>(null);
  const id = query.get('id');
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false)
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const featureRef = useRef<HTMLDivElement | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getOwnerDetails,setGetOwnerDetails] = useState(false)

  useEffect(() => {
    window.scrollTo(0,0)
    const fetchProductDetail = async () => {
      if (id) {
        try {
          setLoading(true)
          const response = await productDetail(id);
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
    if (product && mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [product.location.longitude, product.location.latitude],
        zoom: 12
      });

      const marker = new mapboxgl.Marker()
        .setLngLat([product.location.longitude, product.location.latitude])
        .addTo(map);

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

  const contactOwnerHandle = async (sellerId:string|undefined)=>{
    try {
      const response = await createConversation(userData?._id,sellerId)
      if(response.data&&response.status){
        // set curre3nt user 
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
        await sendOwnerDetails(userData?.name, product, sellerId, userData?.email);
      } catch (error) {
        console.error('Failed to send owner details:', error);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const sendOwnerDetail = async ()=>{
    try {
      const sellerId = product?.sellerId
      const response = await sendOwnerDetails(userData?.name,product,sellerId,userData?.email)
      return response
    } catch (error) {
      console.error(error);
    }
  }

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
      </div> : <> <div className="sticky top-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 border-t border-b border-gray-200 bg-white">
        <Link to={'/'}>
          <h1 className="flex items-center p-4 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
            <IoMdArrowRoundBack className="mr-2" /> Feed
          </h1>
        </Link>
        <h1 onClick={() => {
          imageRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }} className="flex items-center p-4 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
          Overview
        </h1>
        <h1 onClick={() => {
          aboutRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }} className="flex items-center p-4 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
          About Property
        </h1>
        <h1 onClick={() => {
          featureRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }} className="flex items-center p-4 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
          Features
        </h1>
        <h1 className="flex items-center p-4 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
          <FaRegHeart className="mr-2" /> Wishlist
        </h1>
        <h1 onClick={copyUrl} className="flex items-center p-4 cursor-pointer hover:bg-gray-100 hover:rounded-xl hover:text-gray-800">
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

        <div className="container mx-auto px-2 ps-6 flex">
          <div className="flex-col w-2/3">
            <div className="flex flex-col lg:flex-row justify-around items-start mb-4">
              <div className="flex-1 py-5">
                <h1 className="text-4xl font-bold">{product?.propertyName}</h1>
                <div className="flex items-center mt-3 gap-4 pt-5">
                  <h2 className="text-3xl font-semibold">₹{product?.Price}</h2>
                  <div className="flex items-center ms-5 flex-1 basis-1/4">
                    <FaBed className="mr-2 text-xl" /> {product?.noOfBedroom} Beds
                  </div>
                  <div className="flex items-center flex-1 basis-1/4">
                    <FaBath className="mr-2 text-xl" /> {product?.noOfBathroom} Baths
                  </div>
                  <div className="flex items-center flex-1 basis-1/4">
                    <MdPermDataSetting className="mr-2 text-xl" /> {product?.sqft} sqft
                  </div>
                </div>
              </div>
              <div className="flex-1 text-lg mt-4 lg:mt-0">
                <h2 className="flex items-center justify-end pe-5 pt-5">
                  For {product?.propertyFor} - Active <GoDotFill color="green" className="ml-2" />
                </h2>
              </div>
            </div>
            <div className="container mx-auto pb-4">
              <div className="flex items-center text-lg gap-4 ">
                <FaLocationDot className="mr-2" />{product?.location.location}
              </div>
              <hr className="h-5 w-2/3 mt-5 border-t-2" />
            </div>
          </div>
          <div className="w-1/3 border-black border rounded-xl">
            <h1 className="text-2xl font-bold text-center py-5">Thinking of Buying ❓</h1>
            <div className="p-6">
              <button onClick={() => {
                handleSendOwnerDetails()
              }} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Get Owner Details
              </button>
              <p className="text-center text-xl px-5 font-serif">OR</p>
              <button onClick={() => {
                userData?.isPremium ? contactOwnerHandle(product?.sellerId): setIsModalOpen(true)
              }} className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 mt-2">
                Contact Owner
              </button>
              <p className="text-center text-sm mt-2 text-gray-600">
                Contacting the owner allows you to have a detailed chat or video call to learn more about the property.
              </p>
            </div>
          </div>
        </div>

        <GetOwnerDetails isOpen={getOwnerDetails} onClose={ownerDetailsModalClose}/>
        <Modal isOpen={isModalOpen} onClose={handleModalClose} />

        <div className="ps-6 w-2/3" ref={aboutRef}>
          <div>
            <h1 className="text-3xl font-bold">About Property</h1>
            <p className="pt-6">{product?.description}</p>
          </div>
        </div>

        <div className="ps-6 w-2/3 pt-5" ref={featureRef}>
          <div>
            <h1 className="text-3xl font-bold ">Features</h1>
           { <p className="pt-6">{product?.features}</p>}
          </div>
          <hr className="h-5 w-2/3 mt-10 border-t-2" />
        </div>

        <div className="relative overflow-hidden py-5 px-5">
          <h1 className="text-3xl font-bold mb-4">Map</h1>
          <div ref={mapContainer} className="w-full h-[50vh] bg-gray-200 rounded-lg border border-gray-300" />
        </div>
      </>}
    </>
  );
};

export default PropertyDetails;
