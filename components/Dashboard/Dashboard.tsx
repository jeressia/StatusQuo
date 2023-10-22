import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Layout from "../../layout/Layout";

import styles from "./Dashboard.module.scss";
import { Appointment } from "../../pages/dashboard";

interface DashboardProps {
  user: string | null;
  userId: string | null;
  appointments: Appointment[];
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
}

const Dashboard = (props: DashboardProps) => {
  const { user, appointments, setAppointments } = props;
  const [loading, setLoading] = useState(false);
  console.log(appointments);
  const appointmentsRef = collection(db, "appointments");

  useEffect(() => {
    const getAppointments = async () => {
      //Read data
      try {
        const data = await getDocs(appointmentsRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setAppointments(filterData);
      } catch (err) {
        console.log(err);
      }
      //Set state
    };

    getAppointments();
  }, []);

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
              <li key={appointment.id}>
                {appointment.appointment_description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

  return <Layout>{view()}</Layout>;
};

export default Dashboard;
