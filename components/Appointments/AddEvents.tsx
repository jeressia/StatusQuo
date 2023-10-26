import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  const [currentCollection, setCurrentCollection] = useState("");
  const [cleanedUpData, setCleanedUpData] = useState<any>();
  const eventTypes = [
    { id: 1, event_type: "Appointment", icon: "/appointment.svg" },
    { id: 2, event_type: "Sexual Relations", icon: "/sexualrelations.svg" },
    { id: 3, event_type: "Test Results", icon: "/testresults.svg" },
    { id: 4, event_type: "Symptom", icon: "/symptom.svg" },
    // { id: 5, event_type: "Medication", icon: "/.svg" },
  ];

  useEffect(() => {
    console.log("cleanedUpData changed", cleanedUpData);
    if (cleanedUpData) {
      try {
        addDoc(fireBaseCollection(currentCollection), {
          cleanedUpData,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [cleanedUpData]);

  const fireBaseCollection = (
    collectionType: string
  ): CollectionReference<DocumentData> => collection(db, collectionType);

  const onSubmitEvent = (e: any, collectionType: string, data: any) => {
    e.preventDefault();
    switch (collectionType) {
      case "appointments":
        console.log(collectionType, data);
        setCurrentCollection("appointments");
        setCleanedUpData({
          appointment_title: data.appointment_title,
          appointment_start_at: data.appointment_start_at,
          appointment_end_at: data.appointment_end_at,
          appointment_purpose: data.appointment_purpose,
          appointment_doctor: data.appointment_doctor,
          user_id: auth?.currentUser?.uid,
        });
        break;
      case "sexual_relations":
        setCurrentCollection("sexual_relations");
        setCleanedUpData({
          date_of_relations: data.date_of_relations,
          isProtected: data.isProtected,
          partner_name: data.partner_name,
          partner_number: data.partner_number,
          partner_status: data.partner_status,
          user_id: auth?.currentUser?.uid,
        });
        break;
      case "test_results":
        setCurrentCollection("sexual_relations");
        setCleanedUpData({
          date_of_test: data.date_of_test,
          test_type: data.test_type,
          chlamydia: data.chlamydia,
          gonorrhea: data.gonorrhea,
          hep_c: data.hep_c,
          herpes: data.herpes,
          hiv: data.hiv,
          syphillis: data.syphillis,
          trichomoniasis: data.trichomoniasis,
          user_id: auth?.currentUser?.uid,
        });
        break;
      case "symptoms":
        setCurrentCollection("sexual_relations");
        setCleanedUpData({
          date_started: data.date_started,
          date_ended: data.date_ended,
          photo_upload_url: data.photo_upload_url,
          type_of_symptom: data.type_of_symptom,
          user_id: auth?.currentUser?.uid,
        });
        // code block
        break;
      case "medications":
        setCurrentCollection("sexual_relations");
        // code block
        break;
      default:
      // code block
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
            <NewAppointment onSubmitEvent={onSubmitEvent} />
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
