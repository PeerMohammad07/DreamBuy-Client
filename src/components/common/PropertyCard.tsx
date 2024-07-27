import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getRentProperty, getSaleProperty } from '../../api/userApi';

// icons
import { FaBath, FaBed, FaRegHeart } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { MdPermDataSetting } from "react-icons/md";


import { RiMoneyRupeeCircleFill } from 'react-icons/ri';

export interface PropertyRentData {
  propertyFor: "rent";
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
  location: string;
  sellerId: string;
}

export interface PropertySaleData {
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
  location: string;
  sellerId: string;
}

export default function BasicDemo() {
  const [rentProperty, setRentProperty] = useState<PropertyRentData[]>([]);
  const [saleProperty, setSaleProperty] = useState<PropertySaleData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rentData = await getRentProperty();
        const saleData = await getSaleProperty();
        setRentProperty(rentData.data);
        setSaleProperty(saleData.data);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    fetchData();
  }, []);

  // Carousel Responsive
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '992px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1800px',
      numVisible: 4,
      numScroll: 1
    }
  ];


  const productTemplate = (product: PropertyRentData | PropertySaleData) => {
    return (
      <>
        <Card sx={{ maxWidth: 345, height: 370, display: 'flex', flexDirection: 'column' }}>
          <CardActionArea className="flex-1">
            <CardMedia
              component="img"
              image={product.propertyImage[2]}
              alt={product.propertyName}
              sx={{ objectFit: 'cover', height: 245 }}
            />
           </CardActionArea>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <Typography gutterBottom variant="h5" component="div">
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
                    {product.location}
                  </Typography>
                </div>
                <Button
                  icon={<FaRegHeart />}
                  className="p-button-rounded p-button-text"
                />
              </div>
            </CardContent>
        </Card>
      </>
    );
  };

  return (
    <>
      <div className="card">
        <h2 className='font-bold text-3xl text-center py-5'>Rent Properties</h2>
        <Carousel value={rentProperty} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
      </div>
      <div className='pt-5'>
        <h2 className='font-bold text-3xl text-center py-8'>Sale Properties</h2>
        <Carousel value={saleProperty} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
      </div>
    </>
  );
}
