import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useUser } from "../UserProvider";
import SingleAppointment from "./SingleAppointmentCard";
import SingleAppointmentCard from "./SingleAppointmentCard";
import SingleResultsCard from "./SingleResultsCard";
import SingleRelationCard from "./SingleRelationCard";
import SingleSymptomCard from "./SingleSymptomCard";
import Loader from "../Loader";

function AllRecords() {
  const { userId, firebaseLoaded } = useUser();
  const [allRecords, setAllRecords] = useState<any[]>([]);
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

  return !firebaseLoaded ? (
    <Loader />
  ) : (
    <div>
      <button
        className="btn btn-danger btn-sm"
        // onClick={() => placesFilterSearch("std testing", location, 1500)}
      >
        All
      </button>
      <button
        // onClick={() => placesFilterSearch("pharmacy", location, 1500)}
        className="btn btn-danger btn-sm"
      >
        Appointment
      </button>
      <button
        // onClick={() => placesFilterSearch("clinic", location, 1500)}
        className="btn btn-danger btn-sm"
      >
        Sexual History
      </button>
      <button
        // onClick={() =>{ // placesFilterSearch("planned parenthood|hiv|lgbtq", location, 1500)}
        className="btn btn-danger btn-sm"
      >
        Test Results
      </button>
      {allRecords.map((record: any) => {
        if (record.collectionName === "appointments") {
          return (
            <React.Fragment key={record.id}>
              <SingleAppointmentCard appointment={record} />
            </React.Fragment>
          );
        } else if (record.collectionName === "test_results") {
          return (
            <React.Fragment key={record.id}>
              <SingleResultsCard result={record} />
            </React.Fragment>
          );
        } else if (record.collectionName === "sexual_relations") {
          return (
            <React.Fragment key={record.id}>
              <SingleRelationCard relation={record} />
            </React.Fragment>
          );
        } else if (record.collectionName === "symptoms") {
          return (
            <React.Fragment key={record.id}>
              <SingleSymptomCard symptom={record} />
            </React.Fragment>
          );
        }
      })}
    </div>
  );
}

export default AllRecords;
