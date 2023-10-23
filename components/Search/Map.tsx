import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
// import Places from "./places";
// import Distance from "./distance";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map: React.FC = () => {
  const center = useMemo(() => ({ lat: 43, lng: -80 }), []);
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const userLocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       setMapCenter(userLocation);
  //     });
  //   }
  // }, []); // Run this effect only once, when the component mounts

  return (
    <div className="MapComponent">
      {/* <div className="controls">
        <h1>Commute?</h1>
      </div> */}
      <div className="map">
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
        />
      </div>
    </div>
  );
};

export default Map;
