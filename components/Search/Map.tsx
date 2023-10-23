import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Places";
// import Distance from "./distance";

export type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map: React.FC = () => {
  const [location, setLocation] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap | null>(null);
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 36.01973, lng: -86.57831 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "4dbafae57e10f64f",
    }),
    []
  );
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

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const markerSize = new google.maps.Size(50, 50); // Define the size of the marker (width, height) in pixels

  const customMarkerIcon = {
    url: "/favicon.png", // URL to your custom marker icon image
    scaledSize: new window.google.maps.Size(20, 20), // Size of the marker icon
    origin: new window.google.maps.Point(0, 0), // Position of the icon's origin within the image
    anchor: new window.google.maps.Point(25, 25), // Anchor of the marker (centered in this case)
  };

  return (
    <div className="MapComponent">
      <div className="map">
        <GoogleMap
          zoom={13}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {location && <Marker position={location} icon={customMarkerIcon} />}
        </GoogleMap>
      </div>
      <div className="controls">
        <Places
          setLocation={(position: LatLngLiteral) => {
            setLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
        <button>STD Testing</button>
        <button>Pharmacy</button>
        <button>Contraceptives</button>
        <button>Advocacy</button>
      </div>
    </div>
  );
};

export default Map;
