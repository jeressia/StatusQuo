import React, { useEffect, useState } from "react";
import Layout from "../Layout";

import NewAppointment from "./NewAppointment";
import NewSex from "./NewSex";
import NewTestResults from "./NewTestResults";
import NewSymptom from "./NewSymptom";
import NewMedication from "./NewMedication";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

import styles from "./Events.module.scss";
import { useUser } from "../UserProvider";

function AddEvents() {
  const { hiv, herpes } = useUser();
  const [typeOfEventToAdd, setTypeOfEventToAdd] = useState<string>("");

  const eventTypes = [
    { id: 1, event_type: "Appointment", icon: "/appointment.svg" },
    { id: 2, event_type: "Sexual Activity", icon: "/sexualrelations.svg" },
    { id: 3, event_type: "Test Results", icon: "/testresults.svg" },
    { id: 4, event_type: "Symptom", icon: "/symptom.svg" },
    { id: 5, event_type: "Medication", icon: "medication/.svg" },
  ];

  const fireBaseCollection = (
    collectionType: string
  ): CollectionReference<DocumentData> => collection(db, collectionType);

  const onSubmitEvent = (e: any, collectionType: string, data: any) => {
    e.preventDefault();
    switch (collectionType) {
      case "appointments":
        addDoc(fireBaseCollection("appointments"), {
          appointment_title: data.appointment_title,
          appointment_start_at: data.appointment_start_at,
          appointment_end_at: data.appointment_end_at,
          appointment_purpose: data.appointment_purpose,
          appointment_doctor: data.appointment_doctor,
          user_id: auth?.currentUser?.uid,
        });
        setTypeOfEventToAdd("");
        break;
      case "sexual_relations":
        addDoc(fireBaseCollection("sexual_relations"), {
          date_of_relations: data.date_of_relations,
          isProtected: data.isProtected,
          partner_name: data.partner_name,
          partner_number: data.partner_number,
          partner_status: data.partner_status,
          user_id: auth?.currentUser?.uid,
        });
        setTypeOfEventToAdd("");
        break;
      case "test_results":
        addDoc(fireBaseCollection("test_results"), {
          date_of_test: data.date_of_test,
          chlamydia: data.chlamydia,
          gonorrhea: data.gonorrhea,
          hep_c: data.hep_c,
          herpes: data.herpes,
          hiv: data.hiv,
          syphillis: data.syphillis,
          trichomoniasis: data.trich,
          user_id: auth?.currentUser?.uid,
        });
        setTypeOfEventToAdd("");
        break;
      case "symptoms":
        addDoc(fireBaseCollection("symptoms"), {
          date_started: data.date_started,
          date_ended: data.date_ended,
          photo_upload_url: data.photo_upload_url,
          type_of_symptom: data.type_of_symptom,
          user_id: auth?.currentUser?.uid,
        });
        setTypeOfEventToAdd("");
        break;
      case "medications":
        addDoc(fireBaseCollection("medications"), {
          date_prescribed: data.date_prescribed,
          date_filled: data.date_filled,
          prescribing_doctor: data.prescribing_doctor,
          medication_name: data.medication_name,
          medication_dosage: data.medication_dosage,
          medication_frequency: data.medication_frequency,
          medication_method: data.medication_method,
          day_supply: data.day_supply,
          user_id: auth?.currentUser?.uid,
        });
        setTypeOfEventToAdd("");
        break;
      default:
    }
  };

  const view = () => {
    return (
      <div className={styles.addnew}>
        <h1>New Event</h1>
        <div className={styles.addIconContainer}>
          {eventTypes
            .filter(
              (eventType) => hiv || herpes || eventTypes.indexOf(eventType) < 4
            )
            .map((eventType) => (
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
          ) : typeOfEventToAdd === "Sexual Activity" ? (
            <NewSex onSubmitEvent={onSubmitEvent} />
          ) : typeOfEventToAdd === "Test Results" ? (
            <NewTestResults onSubmitEvent={onSubmitEvent} />
          ) : typeOfEventToAdd === "Symptom" ? (
            <NewSymptom onSubmitEvent={onSubmitEvent} />
          ) : typeOfEventToAdd === "Medication" ? (
            <NewMedication onSubmitEvent={onSubmitEvent} />
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
