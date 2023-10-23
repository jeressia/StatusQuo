import React from "react";
import { Appointment } from "../../pages/dashboard";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";

function DeleteAppointment(props: any) {
  const { getAppointments, appointment } = props;
  const deleteAppointment = async (id: string) => {
    const appointmentToDelete = doc(db, "appointments", id);
    await deleteDoc(appointmentToDelete);
    getAppointments();
  };

  return (
    <button onClick={() => deleteAppointment(appointment.id)}>
      Delete Appt
    </button>
  );
}

export default DeleteAppointment;
