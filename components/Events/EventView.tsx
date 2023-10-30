import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Appointment } from "../../types/Interfaces";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

import UpdateAppointment from "./UpdateAppointment";
import DeleteAppointment from "./DeleteEvent";
import { timeNormalizer } from "../../utils/math";
import Link from "next/link";

import styles from "./Events.module.scss";
import { useUser } from "../UserProvider";

interface AppointmentProps {
  appointments: Appointment[];
  userId: string | null;
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
}

function AppointmentView(props: AppointmentProps) {
  const { userId } = useUser();

  const [updatedTitle, setUpdatedTitle] = useState("");
  const { appointments, setAppointments } = props;

  const appointmentsByUser = query(
    collection(db, "appointments"),
    where("user_id", "==", userId)
  );

  const updateAppointment = async (id: string) => {
    const appointmentToUpdate = doc(db, "appointments", id);
    await updateDoc(appointmentToUpdate, {
      appointment_description: updatedTitle,
    });
    getAppointments();
  };

  const getAppointments = async () => {
    try {
      const data = await getDocs(appointmentsByUser);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAppointments(filterData as any);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      <p className={styles.reminders}>Notifications</p>
      <div className={styles.upcomingAppointments}>
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment: Appointment) => (
            <div key={appointment.id} className={styles.reminderCard}>
              <span>{appointment.appointment_purpose}</span>
              <span>{timeNormalizer(appointment?.appointment_start_at)}</span>
            </div>
          ))
        ) : (
          <p>No Notifications</p>
        )}
      </div>
    </>
  );
}

export default AppointmentView;
