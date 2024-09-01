import { useEffect } from 'react';
import { toast } from 'react-toastify';

export interface Location {
  latitude: number|null;
  longitude: number|null;
}

interface GetCurrentLocationProps {
  setLocation: (location: Location) => void;
}


const GetCurrentLocation:React.FC<GetCurrentLocationProps> = ({setLocation}) => {

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
      () => {
        toast.error('Failed to get location');
      }
    );
  };

  useEffect(() => {
    console.log("does it works twice")
    getCurrentLocation();
  }, []);

  return null;
};

export default GetCurrentLocation;
