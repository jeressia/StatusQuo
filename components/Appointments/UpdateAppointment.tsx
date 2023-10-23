import React from "react";

function UpdateAppointment(updateAppointment: any) {
  return <input onChange={(e) => updateAppointment(e.target.value)} />;
}

export default UpdateAppointment;
