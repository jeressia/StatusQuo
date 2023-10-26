import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Appointment } from "../../pages/dashboard";
import {
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

  const appointmentsByUser = query(
    collection(db, "appointments"),
    where("user_id", "==", userId)
  );

  const getAppointments = async () => {
    try {
      const data = await getDocs(appointmentsByUser);
      const filterData = data.docs.map((doc) => ({
        appointment_title: doc.data().appointment_title as string,
        appointment_end_at: doc.data().appointment_end_at as Date,
        appointment_start_at: doc.data().appointment_start_at as Date,
        appointment_purpose: doc.data().appointment_purpose as string,
        appointment_doctor: doc.data().appointment_doctors as string,
        id: doc.id,
      }));

      setAppointments(filterData);
    } catch (err) {
      console.log(err);
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
              <li key={appointment.id}>{appointment.appointment_title}</li>
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
    </div>
  );
}

export default AppointmentView;
