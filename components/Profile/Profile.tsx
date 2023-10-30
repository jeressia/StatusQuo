import React, { useEffect, useState } from "react";
import Layout from "../Layout";

import { Form } from "react-bootstrap";
import { useUser } from "../UserProvider";
import { updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

import styles from "./Profile.module.scss";

interface UserProfile {
  automatic_send?: boolean;
  base_location?: string;
  date_of_birth?: Date;
  email_address?: string;
  first_name?: string;
  herpes_positive?: boolean;
  hiv_positive?: boolean;
  last_name?: string;
  phone_number?: string;
  sex?: string;
  testing_qr_url?: string;
  user_image_url?: string;
  user_name?: null | string;
  user_id?: string | null;
}

const Profile = () => {
  const { user, hiv, setHIV, herpes, setHerpes, userId, signOutUser } =
    useUser();
  const [anonymousData, setAnonymousData] = useState(false);
  const [userName, setUserName] = useState(user?.displayName || "New User");
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();
  const [editMode, setEditMode] = useState(false);
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

  useEffect(() => {
    setUserProfile({
      ...userProfile,
      automatic_send: anonymousData,
      herpes_positive: herpes,
      hiv_positive: hiv,
      user_name: userName,
      user_id: auth?.currentUser?.uid,
    });
  }, [userName, hiv, herpes]);

  const onSubmitProfile = async (e: any, data: UserProfile | undefined) => {
    e.preventDefault();
    setEditMode(false);

    const userDocRef = doc(collection(db, "users"), auth?.currentUser?.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      await setDoc(
        userDocRef,
        {
          ...data,
        },
        { merge: true }
      );
    } else {
      await setDoc(userDocRef, data);
    }
  };

  const view = () => (
    <div className={styles.profile}>
      <h1>Profile Settings</h1>
      <div className={styles.profileForm}>
        <div className="form-group row">
          <label htmlFor="userName" className="col-sm-3">
            Name:
          </label>
          <div className="col-sm-5">
            {editMode ? (
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => {
                  if (user !== null)
                    updateProfile(user, {
                      displayName: userName,
                    });
                }}
              />
            ) : (
              <p>{userName}</p>
            )}
          </div>
          <div className="col-sm-1">
            <a href="#" onClick={() => setEditMode(true)}>
              Edit?
            </a>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-3">
            Email:
          </label>
          <div className="col-sm-4">
            <p id="email">{user?.email}</p>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="herpes" className="col-sm-3">
            <p>Herpes+</p>
          </label>
          <div className="col-sm-3">
            <Form.Check
              type="switch"
              id="herpes"
              checked={herpes}
              onChange={() => handleToggle("herpes")}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="herpes" className="col-sm-3">
            HIV+
          </label>
          <div className="col-sm-3">
            <Form.Check
              type="switch"
              id="protected-switch"
              checked={hiv}
              onChange={() => handleToggle("hiv")}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="anonSend" className="col-sm-6">
            Automatically Send Anonymous Results?
          </label>
          <div className="col-sm-3">
            <Form.Check
              type="switch"
              id="protected-switch"
              checked={anonymousData}
              disabled
              onChange={() => handleToggle("anonymousData")}
            />
          </div>
        </div>
      </div>
      <button
        className="btn btn-secondary mb-2"
        onClick={(e: any) => {
          onSubmitProfile(e, userProfile);
        }}
      >
        Update Profile
      </button>
      <button
        className="btn btn-danger"
        onClick={(e: any) => {
          signOutUser();
        }}
      >
        Sign Out
      </button>
    </div>
  );

  return <Layout>{view()}</Layout>;
};
export default Profile;
