import { useState } from "react";
import Auth from "../components/Auth/Auth";
import Dashboard from "../components/Dashboard/Dashboard";
import Layout from "../layout/Layout";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const view = () => {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  };

  return loggedIn ? (
    <Layout>{view()}</Layout>
  ) : (
    <div className="App">
      <Auth setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
    </div>
  );
}

export default Home;
