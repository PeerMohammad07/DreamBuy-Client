import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { location } from "../seller/AddProperty";

interface CustomGeocoderResult {
  geometry: {
    coordinates: [number, number];
  };
  place_name: string;
}

interface GoogleSearchProps {
  onLocationSelect: (result: location) => void;
  prevLocation?: location;
}

const LocationSearch: React.FC<GoogleSearchProps> = ({
  onLocationSelect,
  prevLocation,
}) => {
  const geocoderContainerRef = useRef<HTMLDivElement | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!geocoderRef.current) {
      try {
        geocoderRef.current = new MapboxGeocoder({
          accessToken:
            "pk.eyJ1IjoiaXJmYW4zNzQiLCJhIjoiY2xwZmlqNzVyMWRuMDJpbmszdGszazMwaCJ9.7wdXsKdpOXmDR9l_ISdIqA",
          mapboxgl: mapboxgl as any,
          flyTo: false,
        });

        if (geocoderContainerRef.current) {
          geocoderRef.current.addTo(geocoderContainerRef.current);
        }

        geocoderRef.current.on("result", (event) => {
          const result = event.result as CustomGeocoderResult;
          onLocationSelect({ location: result.place_name, geometry: result.geometry.coordinates });
        });

        geocoderRef.current.on("error", () => {
          setError("Failed to fetch location data. Please try again.");
        });
      } catch (err) {
        setError("Initialization failed. Please check your configuration.");
      }
    }

    if (geocoderRef.current && prevLocation && inputRef.current) {
      inputRef.current.value = prevLocation.location;
    }
  }, [onLocationSelect, prevLocation]);

  const handleInputChange = () => {
    if (geocoderRef.current && inputRef.current) {
      geocoderRef.current.query(inputRef.current.value);
    }
  };

  return (
    <div className="mt-2 flex flex-col sm:flex-row gap-6 mb-6">
      {error && <div className="error-message">{error}</div>}

      {/* Show the search bar only if prevLocation is not available */}
      <div className={`flex-1 ${prevLocation ? "hidden sm:block" : ""}`}>
        <label
          htmlFor="geocoderInput"
          className="block text-sm font-medium text-white mb-1"
        >
          Location
        </label>
        <div
          ref={geocoderContainerRef}
          className="geocoder-container w-full md:h-10 max-w-xs sm:h-20 mediumSm:h-12 mediumSm:w-60"
          style={{ zIndex: 1 }}
        ></div>
      </div>

      {/* Show the input field only if prevLocation is available */}
      <div className="flex-1">
        {prevLocation && (
          <div>
            <label
              htmlFor="locationSearch"
              className="block text-sm font-medium text-white mb-1"
            >
              Search Location
            </label>
            <input
              id="locationSearch"
              ref={inputRef}
              type="text"
              placeholder="Enter location..."
              className="custom-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={handleInputChange}
              style={{ zIndex: 1 }}
            />
          </div>
        )}
      </div>
    </div>

  );
};

export default LocationSearch;
