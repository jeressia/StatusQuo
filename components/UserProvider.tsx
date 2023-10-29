import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { listenToAuthChanges } from "./Auth/Auth";
import { User, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import router from "next/router";

type UserContextType = {
  user: User | null;
  userId: string | null;
  userProfile: any;
  setUserId: (userId: string | null) => void;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  hiv: boolean;
  signOutUser: () => void;
  setHIV: Dispatch<SetStateAction<boolean>>;
  herpes: boolean;
  setHerpes: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hiv, setHIV] = useState(false);
  const [herpes, setHerpes] = useState(false);

  const getUserProfile = async (userId: string) => {
    const userRef = query(
      collection(db, "users"),
      where("user_id", "==", userId)
    );

    try {
      const data = await getDocs(userRef);
      if (!data.empty) {
        const userData = data.docs[0].data();
        setUserProfile(userData);
        setHIV(userData.hiv_positive);
        setHerpes(userData.herpes_positive);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signOutUser = () => {
    setLoggedIn(false);
    signOut(auth);
    router.replace("/dashboard");
  };
  useEffect(() => {
    const unsubscribe = listenToAuthChanges((authUser: User | null) => {
      if (authUser) {
        setUser(authUser);
        setUserId(authUser.uid);
        setLoggedIn(true);
      } else {
        setUser(null);
        setUserProfile(null);
        setUserId(null);
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        user,
        userId,
        userProfile,
        setUserId,
        loggedIn,
        setLoggedIn,
        signOutUser,
        hiv,
        setHIV,
        herpes,
        setHerpes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
