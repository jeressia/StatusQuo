import React from "react";

function AddAppointments(props: any) {
  const { onSubmitAppointment } = props;
  return <button onClick={onSubmitAppointment}>Create New Appt</button>;
}

export default AddAppointments;
