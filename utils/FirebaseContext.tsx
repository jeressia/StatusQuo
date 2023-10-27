import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";

interface FirebaseContextProps {
  user: any;
  firebaseApp: any;
}

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

// Custom hook to access the context
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    const unsubscribe = getAuth(app).onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoggedIn(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, firebaseApp: app }}>
      {children}
    </FirebaseContext.Provider>
  );
};
