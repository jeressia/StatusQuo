import React, { useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";

const MapContainer: React.FC = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMapCenter(userLocation);
      });
    }
  }, []); // Run this effect only once, when the component mounts

  return (
    <GoogleMap center={{ lat: mapCenter.lat, lng: mapCenter.lng }} zoom={11} />
  );
};

export default MapContainer;
