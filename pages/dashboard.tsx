import { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Auth from "../components/Auth/Auth";
import { Appointment } from "../types/Interfaces";
import { useUser } from "../components/UserProvider";

function Home() {
  const { loggedIn, user, userId } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  return loggedIn && userId !== null ? (
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
