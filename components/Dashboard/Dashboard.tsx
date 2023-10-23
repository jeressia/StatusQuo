import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "firebase/auth";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../utils/firebase";
import Layout from "../../layout/Layout";

import styles from "./Dashboard.module.scss";
import { Appointment } from "../../pages/dashboard";

interface DashboardProps {
  user: string | null;
  userId: number | null;
  appointments: Appointment[];
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
}

const Dashboard = (props: DashboardProps) => {
  const { user, appointments, userId, setAppointments } = props;
  const [loading, setLoading] = useState(false);
  console.log("appointments", appointments);

  const appointmentsCollection = collection(db, "appointments");

  const appointmentsByUser = query(
    collection(db, "appointments"),
    where("user_id", "==", userId)
  );

  const getAppointments = async () => {
    try {
      const data = await getDocs(appointmentsByUser);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAppointments(filterData);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitAppointment = async () => {
    try {
      await addDoc(appointmentsCollection, {
        appointment_description: "Checkup",
        appointment_end_at: new Date("December 17, 2023 03:30:00"),
        appointment_start_at: new Date(new Date("December 17, 2023 04:30:00")),
        user_id: auth?.currentUser?.uid,
      });
      getAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const updateAppointment = async (id: string) => {
    const appointmentToUpdate = doc(db, "appointments", id);
    await updateDoc(appointmentToUpdate, {
      appointment_description: "updated appointment",
    });
  };

  const deleteAppointment = async (id: string) => {
    const appointmentToDelete = doc(db, "appointments", id);
    await deleteDoc(appointmentToDelete);
    getAppointments();
  };

  useEffect(() => {
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
              <>
                <li key={appointment.id}>
                  {appointment.appointment_description}
                </li>
                <p>{appointment?.appointment_start_at?.toLocaleString()}</p>
                <button onClick={() => deleteAppointment(appointment.id)}>
                  Delete Appt
                </button>
                <input onChange={(e) => updateAppointment(e.target.value)} />
              </>
            ))}
          </ul>
          <button onClick={onSubmitAppointment}>Create New Appt</button>
        </div>
      </div>
    );

  return <Layout>{view()}</Layout>;
};

export default Dashboard;
