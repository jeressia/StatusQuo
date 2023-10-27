import { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Auth from "../components/Auth/Auth";
import { Appointment } from "../types/Interfaces";
import { User } from "firebase/auth";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<null | string>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  return loggedIn ? (
    <div className="App">
      <Dashboard
        user={user}
        userId={userId}
        appointments={appointments}
        setAppointments={setAppointments}
      />
    </div>
  ) : (
    <div className="App">
      <Auth
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setUserId={setUserId}
        setUser={setUser}
        userId={userId}
      />
    </div>
  );
}

export default Home;
