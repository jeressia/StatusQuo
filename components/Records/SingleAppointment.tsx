import React from "react";
import { Appointment } from "../../types/Interfaces";
import { timeNormalizer } from "../../utils/math";

interface SingleAppointmentProps {
  appointment: Appointment;
}

function SingleAppointment(props: SingleAppointmentProps) {
  const { appointment } = props;

  return (
    <div className="card">
      {/* <p>{timeNormalizer(appointment?.appointment_start_at)}</p> */}
      <span>
        {appointment.appointment_purpose} with {appointment.appointment_doctor}
      </span>
    </div>
  );
}

function isValidDate(d: any) {
  return d instanceof Date;
}

export default SingleAppointment;
