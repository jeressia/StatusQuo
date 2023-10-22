import { useState } from "react";
import Auth from "../components/Auth/Auth";
import Dashboard from "../components/Dashboard/Dashboard";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true);
  };
  return loggedIn ? (
    <div className="App">
      <Dashboard />
    </div>
  ) : (
    <Auth setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
  );
}

export default Home;
