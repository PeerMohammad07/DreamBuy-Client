import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../Redux/store/store';
import { useEffect, useState } from 'react';
import { getAllWhishlistProperty, removeFromWishlist } from '../../api/userApi';
import { IWishlist } from '../../components/common/Carousel';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CardLoading from '../../components/common/LoadingSkelton/CardLoading';

const Whishlist = () => {
  const dispatch = useDispatch()
  const userData = useSelector((prevState: rootState) => prevState.user.userData);
  const [wishlist, setWishlist] = useState<IWishlist[] | []>([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    async function getAllWishlist() {
      if (userData) {
        setLoading(true)
        const response = await getAllWhishlistProperty(userData._id,dispatch);
        setWishlist(response?.data);
        setLoading(false)
      }
    }
    getAllWishlist();
  }, [userData]);

  const removeFromWish = async (productId:string)=>{
    try {
      if(userData?._id){
        const response = await removeFromWishlist(userData?._id, productId,dispatch);
        if(response){
          setWishlist((prev)=> prev.filter((wish)=> wish.propertyId._id != productId))
        }
        toast.success("removed from wishlist")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4 ms-3">Saved Homes</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {!loading ? wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {wishlist.map((property) => (
                <div key={property.propertyId._id} className="bg-white p-4 shadow rounded-lg">
                  <Link to={`/propertyDetails?id=${property.propertyId._id}`}>
                  <img
                    src={property.propertyId.propertyImage[0]}
                    alt="Property Image"
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  </Link>
                  <div className='flex items-center justify-between'>
                  <h2 className="text-xl font-bold mt-2">{property.propertyId.propertyName}</h2>
                  <FaHeart onClick={()=> removeFromWish(property.propertyId._id)}  className='text-xl text-red-500 mt-2 me-2' />
                  </div>
                  <p className="text-gray-600">{property.propertyId.description.slice(0,80)}...</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-[url('/whish.png')] bg-cover bg-center rounded-full w-96 h-32 mb-4">
              </div>
              <h2 className="text-xl font-bold text-gray-700 my-3">No Saved Homes Yet</h2>
              <p className="text-gray-500 text-center">
                Save homes that you like by clicking the heart icon. They will appear here for easy access.
              </p>
            </div>
          ):<>
             <div className='flex justify-center items-center px-8'>
              <CardLoading />
              <CardLoading />
              <CardLoading />
            </div>
          </>}
        </div>
      </div>
    </div>
  );
};

export default Whishlist;
