import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useState } from "react";

import styles from "./Auth.module.scss";
import { useUser } from "../UserProvider";
import router from "next/router";

export const listenToAuthChanges = (callback: any) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

const Auth = () => {
  const { setLoggedIn, loggedIn, userId } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
      router.replace("/dashboard");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setLoggedIn(true);
      router.replace("/dashboard");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.auth}>
      <img src="/favicon.png" />
      <h1>Status Quo</h1>
      <div className={styles.signupForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.signupBtns}>
        <button
          type="button"
          onClick={() => handleSignIn(email, password)}
          className="btn btn-primary btn-sm"
        >
          <img src="/mail.png" />
          Sign In With Email
        </button>
        <button
          type="button"
          onClick={handleSignInWithGoogle}
          className="btn btn-primary btn-sm"
        >
          <img src="/search.png" />
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
