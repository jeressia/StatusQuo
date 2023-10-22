import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../../utils/firebase";
import { Dispatch, SetStateAction, useState } from "react";

import styles from "./Auth.module.scss";

interface AuthProps {
  setLoggedIn: any;
  loggedIn: boolean;
  setUserId: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<string | null>>;
}

const Auth = (props: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, loggedIn, setUserId, setUser } = props;

  const handleSignIn = async () => {
    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setLoggedIn(true);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      // User is signed in
      if (user.displayName === null) setUser("New User");
      else {
        setUser(user.displayName);
        setUserId(user.uid);
      }
    } else {
      // No user is signed in
      console.log("No user is signed in.");
    }
  });

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
          onClick={handleSignIn}
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
