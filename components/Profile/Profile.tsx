import React from "react";
import Layout from "../Layout";

import styles from "./Profile.module.scss";

const Profile = () => {
  const view = () => <div className={styles.profile}>Profile</div>;

  return <Layout>{view()}</Layout>;
};
export default Profile;
