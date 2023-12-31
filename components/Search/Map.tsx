import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import axios from "axios";

import Places from "./Places";

import styles from "./Search.module.scss";

export type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const Map: React.FC = () => {
  const [location, setLocation] = useState<LatLngLiteral>({
    lat: 36.1627,
    lng: 86.7816,
  });
  const [relevantPlaces, setRelevantPlaces] = useState<LatLngLiteral[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const mapRef = useRef<GoogleMap | null>(null);
  const center = useMemo<LatLngLiteral>(
    () => location || { lat: 36.01973, lng: -86.57831 },
    [location]
  );
  const [zoom, setZoom] = useState(15);

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      mapId: "4dbafae57e10f64f",
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const placesFilterSearch = async (
    searchFilter: string,
    location: LatLngLiteral,
    radius: number
  ) => {
    const params = {
      location: `${location.lat}, ${location.lng}`,
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      input: searchFilter,
      keyword: searchFilter,
      radius,
      inputtype: "textquery",
      category: "health",
      types: "health|hospital",
    };

    const apiUrl = "/api/places";

    try {
      const response = await axios.get(apiUrl, { params });
      if (response && response.data && response.data.results) {
        const placesData = response.data.results;
        if (placesData.length > 0) {
          setRelevantPlaces(placesData);
          setLocation(placesData[0].geometry.location);
          setZoom(12);
        }
      } else {
        console.error("No results found in the API response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);
        mapRef.current?.panTo(userLocation);
      });
    }
  }, []);

  return (
    <div className="MapComponent">
      <div className="map">
        <GoogleMap
          zoom={zoom}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {location && (
            <>
              <Marker position={location} />
              <>
                {relevantPlaces.map((place: any) => (
                  <Marker
                    key={place.geometry.location.lat}
                    position={place.geometry.location}
                    onClick={() => {
                      setSelectedPlace(place);
                    }}
                  />
                ))}
              </>
            </>
          )}
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.geometry.location}
              onCloseClick={() => {
                setSelectedPlace(null);
              }}
            >
              <div>
                <p>{selectedPlace.name}</p>
                <p>{selectedPlace.vicinity}</p>
              </div>
            </InfoWindow>
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
        <div className={styles.searchBtnContainer}>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => placesFilterSearch("std testing", location, 1500)}
          >
            STD Testing
          </button>
          <button
            onClick={() => placesFilterSearch("pharmacy", location, 1500)}
            className="btn btn-danger btn-sm"
          >
            Pharmacy
          </button>
          <button
            onClick={() => placesFilterSearch("clinic", location, 1500)}
            className="btn btn-danger btn-sm"
          >
            Contraceptives
          </button>
          <button
            onClick={() =>
              placesFilterSearch("planned parenthood|hiv|lgbtq", location, 1500)
            }
            className="btn btn-danger btn-sm"
          >
            Advocacy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
