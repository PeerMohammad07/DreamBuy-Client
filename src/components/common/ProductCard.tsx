// icons
import { FaBath, FaBed, FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { MdPermDataSetting } from "react-icons/md";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { RiMoneyRupeeCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { IWishlist, PropertyRentData, PropertySaleData } from './Carousel';
import { addToWishlist, getAllWhishlistProperty, removeFromWishlist } from '../../api/userApi';
import { useEffect, useState } from 'react';
import { rootState } from '../../Redux/store/store';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ProductTemplate = (product: PropertyRentData | PropertySaleData) => {
  const [whishlistProperty, setWhishlistProperty] = useState<IWishlist[] | []>([])
  const userData = useSelector((prevState: rootState) => prevState.user.userData)
  const [isWhish, setIswish] = useState<boolean>(false)

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

  useEffect(() => {
    if (whishlistProperty.length > 0) {
      const isWishlisted = whishlistProperty.some((whishlistData) => whishlistData.propertyId._id == product?._id);
      setIswish(isWishlisted);
    } else {
      setIswish(false);
    }
  }, [whishlistProperty, product?._id]);

  const handleWhishlist = async (productId: string) => {
    try {
      if (isWhish && userData?._id && productId) {
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

  return (
    <>
      <Card sx={{ maxWidth: 300, height: 300, display: 'flex', flexDirection: 'column', margin: '0 15px' }} className='rounded-2xl'>
        <CardActionArea className="flex-1 relative">
          <Link to={`/propertyDetails?id=${product._id}`}>
            <CardMedia
              component="img"
              image={product.propertyImage[2]}
              alt={product.propertyName}
              sx={{ objectFit: 'cover', height: 180 }}
            />
          </Link>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              userData ? handleWhishlist(product._id) : toast.error("please login before add to wishlist")
            }}
            className="rounded-full h-7 w-7 text-black bg-white absolute bottom-1 right-1"
          >
            {isWhish ? (
              <FaHeart className='text-xl text-red-500 relative left-1' />
            ) : (
              <FaRegHeart className='text-xl relative left-1' />
            )}
          </Button>
        </CardActionArea>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '160px',
              }}
            >
              {product.propertyName}
            </Typography>
            <Typography variant="h6" color="text.primary" className="flex items-center">
              <RiMoneyRupeeCircleFill className="mr-1" />
              {product.Price}
            </Typography>
          </div>

          <div className="flex items-center mb-2">
            <FaBed className="mx-2" /> {product.noOfBedroom}
            <FaBath className="mx-2" /> {product.noOfBathroom}
            <MdPermDataSetting className="mx-2" /> {product.sqft}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaLocationDot className="mr-2" />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '160px',
                }}
              >
                {product.location.location}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card >
    </>
  );
};

export default ProductTemplate