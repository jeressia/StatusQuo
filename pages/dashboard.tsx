import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Auth from "../components/Auth/Auth";
import { Timestamp } from "firebase/firestore";
import Search from "../components/Search/Search";
import Records from "../components/Records/Records";

export interface Appointment {
  id: string;
  appointment_description?: string;
  appointment_end_at?: Timestamp;
  appointment_start_at?: Timestamp;
  userId?: string;
}

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<null | string>("");
  const [userId, setUserId] = useState<null | string>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  return (
    <div className="App">
      <Records />
    </div>
  );
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
      />
    </div>
  );
}

export default Home;
