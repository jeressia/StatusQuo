import React, { useEffect, useState } from "react";
import "firebase/auth";
import Layout from "../../layout/Layout";

import styles from "./Dashboard.module.scss";
import { getAppointmentsById } from "../../pages/api/getAppointmentsById";

interface DashboardProps {
  user: string | null;
  userId: string | null;
}
const Dashboard = (props: DashboardProps) => {
  const { user } = props;
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  let userId = 1;

  useEffect(() => {
    // Make the API request when the component mounts
    fetch(`/api/getAppointmentsById?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  }, [userId]);

  const view = () =>
    loading ? (
      <div>Loading...</div>
    ) : (
      <div className={styles.dashboard}>
        <div className={styles.greeting}>
          <p>Hello, {user}! </p>
        </div>
        <div className={styles.upcomingAppointments}>
          <h1>Appointments</h1>
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>{appointment.title}</li>
            ))}
          </ul>
        </div>
      </div>
    );

  return <Layout>{view()}</Layout>;
};

export default Dashboard;
