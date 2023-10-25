import Link from "next/link";
import React, { useState } from "react";
import Layout from "../../layout/Layout";

import styles from "./Appointments.module.scss";
import { type } from "os";
import NewAppointment from "./NewAppointment";
import NewSex from "./NewSex";
import NewTestResults from "./NewTestResults";
import NewSymptom from "./NewSymptom";
import NewMedication from "./NewMedication";

function AddEvents(props: any) {
  const { onSubmitAppointment } = props;
  // <button onClick={onSubmitAppointment}>+ Add</button>

  const [typeOfEventToAdd, setTypeOfEventToAdd] = useState<string>("");

  const eventTypes = [
    { id: 1, event_type: "Appointment", icon: "/appointment.svg" },
    { id: 2, event_type: "Sexual Relations", icon: "/sexualrelations.svg" },
    { id: 3, event_type: "Test Results", icon: "/testresults.svg" },
    { id: 4, event_type: "Symptom", icon: "/symptom.svg" },
    // { id: 5, event_type: "Medication", icon: "/.svg" },
  ];

  console.log("typeOfEventToAdd:", typeOfEventToAdd);

  const view = () => {
    return (
      <div className={styles.addnew}>
        <h1>New Event</h1>
        <div className={styles.addIconContainer}>
          {eventTypes.map((eventType) => (
            <div
              onClick={() => setTypeOfEventToAdd(eventType.event_type)}
              className={styles.addNewType}
              key={eventType.id}
            >
              <img src={eventType.icon} alt="" />
              <p>{eventType.event_type}</p>
            </div>
          ))}
        </div>
        <div className={styles.newForm}>
          {typeOfEventToAdd === "Appointment" ? (
            <NewAppointment />
          ) : typeOfEventToAdd === "Sexual Relations" ? (
            <NewSex />
          ) : typeOfEventToAdd === "Test Results" ? (
            <NewTestResults />
          ) : typeOfEventToAdd === "Symptom" ? (
            <NewSymptom />
          ) : typeOfEventToAdd === "Medication" ? (
            <NewMedication />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  return <Layout>{view()}</Layout>;
}

export default AddEvents;
