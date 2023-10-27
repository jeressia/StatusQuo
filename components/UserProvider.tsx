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
import { User } from "firebase/auth";

type UserContextType = {
  user: User | null;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  hiv: boolean;
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
  const [userId, setUserId] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hiv, setHIV] = useState(false);
  const [herpes, setHerpes] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user: User | null) => {
      if (user) {
        setUser(user);
        setUserId(user?.uid);
        setLoggedIn(true);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userId,
        setUserId,
        loggedIn,
        setLoggedIn,
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
