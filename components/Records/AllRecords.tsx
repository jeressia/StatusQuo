import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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

  useEffect(() => {
    fetchAllUserData(userId).then((combinedUserData) => {
      // setAllRecords(combinedUserData);
    });
  }, []);

  console.log("userId in all records", userId);

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

  const fetchAllUserData = async (userId: string | null) => {
    const userDataPromises = collectionNames.map((collectionName) =>
      fetchDataForUser(collectionName, userId)
    );
    const allUserData = await Promise.all(userDataPromises);
    setAllRecords(allUserData.flat());
  };

  console.log(allRecords);

  return (
    <div>
      {allRecords.map((record: any) => (
        <div key={record.id}>
          <p>Appointment Doctor: {record.appointment_doctor}</p>
          {/* Add more properties as needed */}
        </div>
      ))}
    </div>
  );
}

export default AllRecords;
