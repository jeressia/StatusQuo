import React, { useState } from "react";
import Layout from "../Layout";

import styles from "./Profile.module.scss";
import { Form } from "react-bootstrap";
import { useUser } from "../UserProvider";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, hiv, setHIV, herpes, setHerpes } = useUser();
  const [anonymousData, setAnonymousData] = useState(false);
  const [userName, setUserName] = useState(user?.displayName);

  const stateSetterFunctions: Record<
    string,
    React.Dispatch<React.SetStateAction<any>>
  > = {
    herpes: setHerpes,
    hiv: setHIV,
    anonymousData: setAnonymousData,
  };

  const handleToggle = (stateVariableName: string) => {
    const setState: any = stateSetterFunctions[stateVariableName];

    if (setState) {
      setState((prevState: any) => !prevState);
    } else {
      console.error(`State variable ${stateVariableName} not found`);
    }
  };

  console.log("user", user);
  console.log("userName", userName);
  const view = () => (
    <div className={styles.profile}>
      <h1>Profile Settings</h1>
      <p>Name:</p>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        onBlur={() => {
          if (user !== null)
            updateProfile(user, {
              displayName: userName,
            });
        }}
      />
      <p>Email:</p>
      <p>{user?.email}</p>
      <p>Herpes+</p>
      <div className="col-sm-9">
        <Form.Check
          type="switch"
          id="protected-switch"
          checked={herpes}
          onChange={() => handleToggle("herpes")}
        />
      </div>
      <p>HIV+</p>
      <div className="col-sm-9">
        <Form.Check
          type="switch"
          id="protected-switch"
          checked={hiv}
          onChange={() => handleToggle("hiv")}
        />
      </div>
      <p>Automatically Send Anonymous Warning?</p>
      <div className="col-sm-9">
        <Form.Check
          type="switch"
          id="protected-switch"
          checked={anonymousData}
          disabled
          onChange={() => handleToggle("anonymousData")}
        />
      </div>
    </div>
  );

  return <Layout>{view()}</Layout>;
};
export default Profile;
