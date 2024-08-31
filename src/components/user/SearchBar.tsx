import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

interface MapboxSearchProps {
  onLocationSelect: any
  mapboxAccessToken: string;
}

const MapboxSearch: React.FC<MapboxSearchProps> = ({ onLocationSelect, mapboxAccessToken }) => {
  const geocoderContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (geocoderContainerRef.current) {
      mapboxgl.accessToken = mapboxAccessToken;
      const geocoder = new mapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'Search based on location...',
        bbox: [-180, -90, 180, 90], 
        mapboxgl: mapboxgl as any
      });

      geocoder.on('result', (event) => {
        onLocationSelect(event.result);
      });

      geocoderContainerRef.current.appendChild(geocoder.onAdd());
    }

    return () => {
      if (geocoderContainerRef.current) {
        geocoderContainerRef.current.innerHTML = '';
      }
    };
  }, [mapboxAccessToken, onLocationSelect]);

  return (
    <div
      ref={geocoderContainerRef}
      className="xl:ms-90 lg:ms-72 md:ms-32  lg:ps-20 xl:ps-28 "
      style={{ width: '100%', height: '40px' }}
    />
  );
};

export default MapboxSearch;
