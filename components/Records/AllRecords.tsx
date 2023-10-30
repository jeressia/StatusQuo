import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useUser } from "../UserProvider";
import SingleAppointmentCard from "./SingleAppointmentCard";
import SingleResultsCard from "./SingleResultsCard";
import SingleRelationCard from "./SingleRelationCard";
import SingleSymptomCard from "./SingleSymptomCard";
import Loader from "../Loader";

import styles from "./Records.module.scss";

function AllRecords() {
  const { userId, firebaseLoaded } = useUser();
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [eventsToShow, setEventsToShow] = useState("all");
  const collectionNames = [
    "appointments",
    "medications",
    "sexual_relations",
    "symptoms",
    "test_results",
  ];

  const fetchDataForUser = async (
    collectionName: string,
    userId: string | null
  ) => {
    const data: any = [];
    const q = query(
      collection(db, collectionName),
      where("user_id", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push({
        collectionName,
        ...doc.data(),
      });
    });

    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const userDataPromises = collectionNames.map((collectionName) =>
        fetchDataForUser(collectionName, userId)
      );
      const allUserData = await Promise.all(userDataPromises);
      const flattenedData = allUserData.flat();
      setAllRecords(flattenedData);
    };

    fetchData();
  }, [userId]);

  const filteredRecords =
    eventsToShow === "all"
      ? allRecords
      : allRecords.filter((record) => record.collectionName === eventsToShow);

  return !firebaseLoaded ? (
    <Loader />
  ) : (
    <div className={styles.allRecordsContainer}>
      <div className={styles.filterBtns}>
        <button
          className={`btn btn-danger btn-sm mr-2 ${
            eventsToShow === "all" ? "active" : ""
          }`}
          onClick={() => setEventsToShow("all")}
        >
          All
        </button>
        <button
          onClick={() => setEventsToShow("appointments")}
          className={`btn btn-light btn-sm ${
            eventsToShow === "appointments" ? "active" : ""
          }`}
        >
          Appointment
        </button>
        <button
          onClick={() => setEventsToShow("sexual_relations")}
          className={`btn btn-light btn-sm ${
            eventsToShow === "sexual_relations" ? "active" : ""
          }`}
        >
          Sexual History
        </button>
        <button
          onClick={() => setEventsToShow("test_results")}
          className={`btn btn-light btn-sm ${
            eventsToShow === "test_results" ? "active" : ""
          }`}
        >
          Test Results
        </button>
      </div>
      {filteredRecords.map((record: any) => {
        const uniqueKey = `${record.collectionName}-${record.id}`;
        switch (record.collectionName) {
          case "appointments":
            return (
              <React.Fragment key={uniqueKey}>
                <SingleAppointmentCard appointment={record} />
              </React.Fragment>
            );
          case "test_results":
            return (
              <React.Fragment key={uniqueKey}>
                <SingleResultsCard result={record} />
              </React.Fragment>
            );
          case "sexual_relations":
            return (
              <React.Fragment key={uniqueKey}>
                <SingleRelationCard relation={record} />
              </React.Fragment>
            );
          case "symptoms":
            return (
              <React.Fragment key={uniqueKey}>
                <SingleSymptomCard symptom={record} />
              </React.Fragment>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default AllRecords;
