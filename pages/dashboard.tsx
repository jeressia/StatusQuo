import { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Auth from "../components/Auth/Auth";
import { Timestamp } from "firebase/firestore";

export interface Appointment {
  id: string | null;
  appointment_title: string;
  appointment_end_at: Date;
  appointment_start_at: Date;
  appointment_purpose: string;
  appointment_doctor: string;
}

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<null | string>("");
  const [userId, setUserId] = useState<null | string>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  console.log("userId: in dashboard", userId);

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
