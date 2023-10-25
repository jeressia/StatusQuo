import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Appointment } from "../../pages/dashboard";
import {
  addDoc,
  collection,
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
import { timeNormalizer } from "../../utils/math";
import Link from "next/link";

interface AppointmentProps {
  appointments: Appointment[];
  userId: string | null;
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
}

function AppointmentView(props: AppointmentProps) {
  const [updatedTitle, setUpdatedTitle] = useState("");
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

  const updateAppointment = async (id: string) => {
    const appointmentToUpdate = doc(db, "appointments", id);
    await updateDoc(appointmentToUpdate, {
      appointment_description: updatedTitle,
    });
    getAppointments();
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className={styles.upcomingAppointments}>
      <h1>Upcoming Appointments</h1>
      {appointments && appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment: Appointment) => (
            <>
              <li key={appointment.id}>
                {appointment.appointment_description}
              </li>
              <p>{timeNormalizer(appointment?.appointment_start_at)}</p>
              <UpdateAppointment
                appointment={appointment}
                updateAppointment={updateAppointment}
                updatedTitle={updatedTitle}
                setUpdatedTitle={setUpdatedTitle}
              />
              <DeleteAppointment
                getAppointments={getAppointments}
                appointment={appointment}
              />
            </>
          ))}
        </ul>
      ) : (
        <p>No upcoming appointments</p>
      )}

      <Link className="nav-link" href={`/addnew`}>
        + Add
      </Link>
      {/* <AddAppointments onSubmitAppointment={onSubmitAppointment} /> */}
    </div>
  );
}

export default AppointmentView;
