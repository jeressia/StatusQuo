import React from "react";
import Layout from "../Layout";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import Map from "./Map";

import styles from "./Search.module.scss";

const libraries: Libraries = ["places"];

const Search = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
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
