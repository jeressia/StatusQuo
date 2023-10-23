import React from "react";
import Layout from "../../layout/Layout";
import MapContainer from "./Map";

const Search = () => {
  const view = () => (
    <div>
      <MapContainer />
    </div>
  );

  return <Layout>{view()}</Layout>;
};
export default Search;
