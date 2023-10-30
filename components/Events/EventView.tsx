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
  console.log("userId in eventview", userId);
  const { appointments, setAppointments } = props;

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
      setAppointments(filterData as any);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);
  const hasAppointments = appointments.length > 0;
  return (
    <>
      <div className={styles.notificationsHeader}>
        <span className={styles.reminders}>Notifications</span>
        <span className={hasAppointments ? styles.alertPill : "d-none"}>
          {hasAppointments ? appointments.length : ""}
        </span>
      </div>
      <div className={styles.upcomingAppointments}>
        {appointments && hasAppointments ? (
          appointments.map((appointment: Appointment) => (
            <div key={appointment.id} className={styles.reminderCard}>
              <span>{appointment.appointment_purpose}</span>
              <span>{timeNormalizer(appointment?.appointment_start_at)}</span>
            </div>
          ))
        ) : (
          <p className={styles.noNotifications}>No Notifications</p>
        )}
      </div>
    </>
  );
}

export default AppointmentView;
