import React from "react";

function UpdateAppointment(props: any) {
  const { updateAppointment, appointment, updatedTitle, setUpdatedTitle } =
    props;
  return (
    <>
      <input onChange={(e) => setUpdatedTitle(e.target.value)} />
      <button onClick={() => updateAppointment(appointment.id)}>Update</button>
    </>
  );
}

export default UpdateAppointment;
