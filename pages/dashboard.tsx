import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Auth from "../components/Auth/Auth";

export interface Appointment {
  id: string;
  appointment_description?: string;
  appointment_end_at?: Date;
  appointment_start_at?: Date;
  userId?: string;
}

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<null | string>("");
  const [userId, setUserId] = useState<null | number>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  return (
    <div className="App">
      <Dashboard
        user={user}
        userId={userId}
        appointments={appointments}
        setAppointments={setAppointments}
      />
    </div>
  );
  // return loggedIn ? (
  //   <div className="App">
  //     <Dashboard
  //       user={user}
  //       userId={userId}
  //       appointments={appointments}
  //       setAppointments={setAppointments}
  //     />
  //   </div>
  // ) : (
  //   <div className="App">
  //     <Auth
  //       setLoggedIn={setLoggedIn}
  //       loggedIn={loggedIn}
  //       setUserId={setUserId}
  //       setUser={setUser}
  //     />
  //   </div>
  // );
}

export default Home;
