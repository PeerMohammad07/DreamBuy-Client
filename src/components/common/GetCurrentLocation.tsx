import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface Location {
  latitude: number|null;
  longitude: number|null;
}

interface GetCurrentLocationProps {
  setLocation: (location: Location) => void;
}


const GetCurrentLocation:React.FC<GetCurrentLocationProps> = ({setLocation}) => {
  // const [streetAddress, setStreetAddress] = useState<string>('');
  // const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

  // const getCurrentAddress = async () => {
  //   if (location.latitude && location.longitude) {
  //     try {
  //       const response = await axios.get(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${accessToken}`
  //       );
  //       console.log(response)
  //       return response.data.results[0]?.formatted_address || 'Address not found';
  //     } catch (error) {
  //       console.error('Error fetching address:', error);
  //       toast.error('Failed to fetch address');
  //       return 'Error';
  //     }
  //   }
  //   return 'Location not available';
  // };



  // const { data } = useQuery({
  //   queryKey: ['locationData', location],
  //   queryFn: getCurrentAddress,
  //   enabled: !!location.latitude && !!location.longitude, 
  // });


  // useEffect(() => {
  //   if (data) {
  //     setStreetAddress(data);
  //   }
  // }, [data]);


  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast.error('Failed to get location');
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      {/* <h1>{streetAddress}</h1> */}
    </>
  );
};

export default GetCurrentLocation;
