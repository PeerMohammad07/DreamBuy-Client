import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import ProductTemplate from '../../components/common/ProductCard';


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
  isBoosted:boolean
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
  isBoosted:boolean
}

export interface IWishlist {
  _id: string
  userId: string
  propertyId: {
    _id:string,
    propertyImage : string[],
    propertyName : string,
    description:string
  }
}

interface BoostCarouselProps {
  premiumProperty: any; 
}

const BoostCarousel: React.FC<BoostCarouselProps> = ({ premiumProperty }) => {

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
      numScroll: 2
    },
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 2
    },
    {
      breakpoint: '1800px',
      numVisible: 5,
      numScroll: 3
    }
  ];

  return (
    <>
      <div className="card shadow-lg">
         <Carousel autoplayInterval={5000} value={premiumProperty} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={ProductTemplate} />
         </div>
  
    </>
  );
}


export default BoostCarousel