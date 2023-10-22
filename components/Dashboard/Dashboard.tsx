import React, { useState } from "react";
import { app } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/auth";
import Navigation from "../Navigation/Navigation";

const Dashboard = () => {
  const [user, setUser] = useState<null | string>("");
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      // User is signed in
      if (user.displayName === null) setUser("New User");
      else setUser(user.displayName);
    } else {
      // No user is signed in
      console.log("No user is signed in.");
    }
  });

  return <div>Hello, {user}! </div>;
};

export default Dashboard;
