import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Dispatch, SetStateAction, useState } from "react";

import styles from "./Auth.module.scss";
import { useUser } from "../UserProvider";

// interface AuthProps {
//   setLoggedIn: any;
//   loggedIn: boolean;
//   setUserId: Dispatch<SetStateAction<string | null>>;
//   setUser: Dispatch<SetStateAction<User | null>>;
//   userId: string | null;
// }

export const handleSignIn = async (
  email: string,
  password: string,
  updateUserIdAndLoginStatus: (
    loggedIn: boolean,
    userId?: string | null
  ) => void
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    updateUserIdAndLoginStatus(true, auth?.currentUser?.uid);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const handleSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const signOutUser = () => {
  return signOut(auth);
};

export const listenToAuthChanges = (callback: any) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

const Auth = () => {
  const { setUserId, setLoggedIn, loggedIn, userId } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateUserIdAndLoginStatus = (
    loggedIn: boolean,
    userId: string | null
  ) => {
    setUserId(userId);
    setLoggedIn(loggedIn);
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
          onClick={() =>
            handleSignIn(email, password, () =>
              updateUserIdAndLoginStatus(loggedIn, userId)
            )
          }
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
