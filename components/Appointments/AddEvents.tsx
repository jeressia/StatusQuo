import Link from "next/link";
import React, { useState } from "react";
import Layout from "../../layout/Layout";

import styles from "./Appointments.module.scss";
import NewAppointment from "./NewAppointment";
import NewSex from "./NewSex";
import NewTestResults from "./NewTestResults";
import NewSymptom from "./NewSymptom";
import NewMedication from "./NewMedication";
import { Appointment } from "../../pages/dashboard";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

function AddEvents() {
  const [typeOfEventToAdd, setTypeOfEventToAdd] = useState<string>("");
  const [cleanedUpData, setCleanedUpData] = useState<any>();
  const eventTypes = [
    { id: 1, event_type: "Appointment", icon: "/appointment.svg" },
    { id: 2, event_type: "Sexual Relations", icon: "/sexualrelations.svg" },
    { id: 3, event_type: "Test Results", icon: "/testresults.svg" },
    { id: 4, event_type: "Symptom", icon: "/symptom.svg" },
    // { id: 5, event_type: "Medication", icon: "/.svg" },
  ];

  const currentCollection = (
    collectionType: string
  ): CollectionReference<DocumentData> => collection(db, collectionType);

  const fieldsToSubmit = (collectionType: string, data: any) => {
    switch (collectionType) {
      case "appointment":
        setCleanedUpData({
          appointment_description: data.appointment_description,
          appointment_end_at: data.appointment_end_at,
          appointment_start_at: data.appointment_start_at,
          user_id: auth?.currentUser?.uid,
        });
        break;
      case "sexual_relations":
        setCleanedUpData({
          date_of_relations: data.date,
          isProtected: data.isProtected,
          partner_name: data.appointment_start_at,
          partner_number: data.partner_number,
          partner_status: data.partner_status,
          user_id: auth?.currentUser?.uid,
        });
        console.log("submitting new sex", cleanedUpData);
        break;
      case "test_results":
        // code block
        break;
      case "symptoms":
        // code block
        break;
      case "medications":
        // code block
        break;
      default:
      // code block
    }
  };

  const onSubmitEvent = async (
    e: React.FormEvent<HTMLFormElement>,
    collection: string,
    data: any
  ) => {
    e.preventDefault();
    fieldsToSubmit(collection, data);
    try {
      await addDoc(currentCollection(collection), {
        cleanedUpData,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const view = () => {
    return (
      <div className={styles.addnew}>
        <h1>New Event</h1>
        <div className={styles.addIconContainer}>
          {eventTypes.map((eventType) => (
            <div
              onClick={() => setTypeOfEventToAdd(eventType.event_type)}
              className={
                typeOfEventToAdd === eventType.event_type
                  ? styles.active
                  : styles.addNewType
              }
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
            <NewSex onSubmitEvent={onSubmitEvent} />
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
