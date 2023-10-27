import React from "react";
import Layout from "../../layout/Layout";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";

import styles from "./Search.module.scss";

// import { libraries } from "../../utils/libraries";

const Search = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const view = () =>
    !isLoaded ? (
      <div>Loading...</div>
    ) : loadError ? (
      <div>Load Error</div>
    ) : (
      <div className={styles.Search}>
        <Map />
      </div>
    );

  return <Layout>{view()}</Layout>;
};
export default Search;
