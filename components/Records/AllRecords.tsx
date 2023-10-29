import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useUser } from "../UserProvider";

function AllRecords() {
  const { userId } = useUser();
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const collectionNames = [
    "appointments",
    "medications",
    "sexual_relations",
    "symptoms",
    "test_results",
  ];

  // console.log("userId in all records", userId);
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
      data.push(doc.data());
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

  // console.log("allRecords", allRecords);
  return (
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
            <div key={record.id}>
              <p>Appointment Doctor: {record.appointment_doctor}</p>
              <p>Appointment Time: {record.appointment_time}</p>
            </div>
          );
        } else if (record.collectionName === "test_results") {
        } else if (record.collectionName === "sexual_relations") {
        } else if (record.collectionName === "symptoms") {
        }
      })}
    </div>
  );
}

export default AllRecords;
