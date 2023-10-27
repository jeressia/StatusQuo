import React, { ReactNode } from "react";
import Navigation from "./Navigation/Navigation";
import { useUser } from "./UserProvider";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { loggedIn } = useUser();
  return (
    <div>
      <div className="mobile-container">
        {!loggedIn ? (
          ""
        ) : (
          <img src="/favicon.png" alt="" className="header-logo" />
        )}
        {children}
        <Navigation />
      </div>
    </div>
  );
}
