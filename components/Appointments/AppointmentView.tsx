import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Appointment } from "../../pages/dashboard";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

import styles from "./Appointments.module.scss";
import UpdateAppointment from "./UpdateAppointment";
import DeleteAppointment from "./DeleteAppointment";
import AddAppointments from "./AddAppointments";

interface AppointmentProps {
  appointments: Appointment[];
  userId: string | null;
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
}

function AppointmentView(props: AppointmentProps) {
  const { appointments, userId, setAppointments } = props;

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

  console.log(appointments, "appointments");

  const updateAppointment = async (id: string) => {
    const appointmentToUpdate = doc(db, "appointments", id);
    await updateDoc(appointmentToUpdate, {
      appointment_description: "updated appointment",
    });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className={styles.upcomingAppointments}>
      <h1>Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <>
            <li key={appointment.id}>{appointment.appointment_description}</li>
            <p>{appointment?.appointment_start_at?.toLocaleString()}</p>
            <UpdateAppointment updateAppointment={updateAppointment} />
            <DeleteAppointment
              getAppointments={getAppointments}
              appointment={appointment}
            />
          </>
        ))}
      </ul>
      <AddAppointments onSubmitAppointment={onSubmitAppointment} />
    </div>
  );
}

export default AppointmentView;
