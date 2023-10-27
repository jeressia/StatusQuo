import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
    () => location || { lat: 36.01973, lng: -86.57831 },
    [location]
  );

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "4dbafae57e10f64f",
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const customMarkerIcon = {
    url: "/gpspin.svg", // URL to your custom marker icon image
    scaledSize: new window.google.maps.Size(35, 35), // Size of the marker icon
    origin: new window.google.maps.Point(0, 0), // Position of the icon's origin within the image
    anchor: new window.google.maps.Point(25, 25), // Anchor of the marker (centered in this case)
  };

  const generateInterestPlaces = (position: LatLngLiteral) => {
    const _interestPlaces: LatLngLiteral[] = [];
    for (let i = 0; i < 100; i++) {
      const direction = Math.random() < 0.5 ? -2 : 2;
      _interestPlaces.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
      });
    }
    return _interestPlaces;
  };

  const interestPlaces = useMemo(
    () => generateInterestPlaces(center),
    [center]
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);
        mapRef.current?.panTo(userLocation); // Set the map's center to the user's location
      });
    }
  }, []);

  return (
    <div className="MapComponent">
      <div className="map">
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {location && (
            <>
              <Marker position={location} icon={customMarkerIcon} />
              <MarkerClusterer>
                {(clusterer) => (
                  <>
                    {interestPlaces.map((location: any) => (
                      <Marker
                        key={location.lat}
                        position={location}
                        clusterer={clusterer}
                      />
                    ))}
                  </>
                )}
              </MarkerClusterer>

              {/* <Circle center={location} radius={400} /> */}
            </>
          )}
        </GoogleMap>
      </div>
      <div className="controls">
        <h1>Find Resources</h1>
        <Places
          setLocation={(position: LatLngLiteral) => {
            setLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
        <div>
          <button className="btn btn-danger btn-sm">STD Testing</button>
          <button className="btn btn-danger btn-sm"> Pharmacy</button>
          <button className="btn btn-danger btn-sm">Contraceptives</button>
          <button className="btn btn-danger btn-sm">Advocacy</button>
        </div>
      </div>
    </div>
  );
};

export default Map;
