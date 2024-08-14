import { useState, useEffect } from 'react';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import {getRentProperty, getSaleProperty } from '../../api/userApi';
import CardLoading from './LoadingSkelton/CardLoading';
import { useSelector } from 'react-redux';
import { rootState } from '../../Redux/store/store';
import ProductTemplate from './ProductCard';

export interface location {
  location: string
  longitude: number
  latitude: number
}

export interface PropertyRentData {
  _id: string
  propertyFor: "rent";
  propertyType: string;
  propertyName: string;
  propertyStatus: boolean
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

export interface PropertySaleData {
  _id: string
  propertyFor: "sale";
  propertyType: string;
  propertyName: string;
  propertyStatus: boolean
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

export interface IWishlist {
  _id: string
  userId: string
  propertyId: string
}

export default function BasicDemo() {
  const [rentProperty, setRentProperty] = useState<PropertyRentData[]>([]);
  const [saleProperty, setSaleProperty] = useState<PropertySaleData[]>([]);
  const [propertyLoading, setPropertyLoading] = useState(false)

  const userData = useSelector((prevState: rootState) => prevState.user.userData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPropertyLoading(true)
        const rentData = await getRentProperty();
        const saleData = await getSaleProperty();
        setRentProperty(rentData.data);
        setSaleProperty(saleData.data);
        setPropertyLoading(false)
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
      numVisible: 4, 
      numScroll: 1
    },
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1800px',
      numVisible: 5,
      numScroll: 1
    }
  ];

  return (
    <>
      <div className="card">
        <h2 className='font-bold text-3xl text-center py-5'>Rent Properties</h2>
        {
          propertyLoading ? <>
            <div className='flex justify-center items-center px-8'>
              <CardLoading />
              <CardLoading />
              <CardLoading />
            </div>
          </> : <Carousel value={rentProperty} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={ProductTemplate} />

        }      </div>
      <div className='pt-5'>
        <h2 className='font-bold text-3xl text-center py-8'>Sale Properties</h2>
        {
          propertyLoading ? <>
            <div className='flex justify-center items-center px-8'>
              <CardLoading />
              <CardLoading />
              <CardLoading />
            </div>
          </> :
            <Carousel value={saleProperty} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={ProductTemplate} />
        }
      </div>
    </>
  );
}
