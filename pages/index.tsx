import { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Auth from "../components/Auth/Auth";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<null | string>("");
  const [userId, setUserId] = useState<null | string>("");

  // return (
  //   <div className="App">
  //     <Dashboard />
  //   </div>
  // );
  return loggedIn ? (
    <div className="App">
      <Dashboard user={user} userId={userId} />
    </div>
  ) : (
    <div className="App">
      <Auth
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setUserId={setUserId}
        setUser={setUser}
      />
    </div>
  );
}

export default Home;
