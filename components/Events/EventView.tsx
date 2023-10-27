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

  const collectionRef = collection(db, "appointments");

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
      console.log("data: ", data);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("filterData: ", filterData);
      const index = 0;
      setAppointments(filterData as any);
    } catch (err) {
      console.log(err);
    }
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
              {/* <p>{timeNormalizer(appointment?.appointment_start_at)}</p> */}
              <UpdateAppointment
                appointment={appointment}
                updateAppointment={updateAppointment}
                updatedTitle={updatedTitle}
                setUpdatedTitle={setUpdatedTitle}
              />
              <DeleteAppointment
                // getAppointments={getAppointments}
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
