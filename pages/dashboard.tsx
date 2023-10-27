import { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Auth from "../components/Auth/Auth";
import { Appointment } from "../types/Interfaces";
import { User } from "firebase/auth";
import { useUser } from "../components/UserProvider";

function Home() {
  const { loggedIn, user, userId } = useUser();
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [userId, setUserId] = useState<null | string>(null);
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
      <Auth />
    </div>
  );
}

export default Home;
