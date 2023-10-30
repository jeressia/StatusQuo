import React from "react";
import { Appointment } from "../../types/Interfaces";
import { timeNormalizer } from "../../utils/math";

import styles from "./Records.module.scss";

interface SingleAppointmentProps {
  appointment: Appointment;
}

function SingleAppointmentCard(props: SingleAppointmentProps) {
  const { appointment } = props;

  return (
    <div className={styles.recordCard}>
      <p className={styles.recordCardDate}>
        {timeNormalizer(appointment?.appointment_start_at)}
      </p>
      <span className={styles.recordCardDesc}>
        {appointment.appointment_purpose} with {appointment.appointment_doctor}
      </span>
    </div>
  );
}

export default SingleAppointmentCard;
