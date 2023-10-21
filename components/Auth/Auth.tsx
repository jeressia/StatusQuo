import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../utils/firebase";
import { useState } from "react";

import styles from "./Auth.module.scss";

interface AuthProps {
  setLoggedIn: any;
  loggedIn: boolean;
}

const Auth = (props: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, loggedIn } = props;

  const handleSignUp = async () => {
    const auth = getAuth(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert(
        "Signup successful! You may sign in with your email address and password now."
      );
      setLoggedIn(true);
    } catch (error: any) {
      console.error("Error creating user:", error.message);
    }
  };

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
      <p>
        New user?
        <a href="#" className="link-dark" onClick={handleSignUp}>
          Sign-up
        </a>
      </p>
    </div>
  );
};

export default Auth;
