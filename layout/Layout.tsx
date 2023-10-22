import React, { ReactNode } from "react";
import Navigation from "../components/Navigation/Navigation";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="mobile-container">
        {children}
        <Navigation />
      </div>
    </div>
  );
}