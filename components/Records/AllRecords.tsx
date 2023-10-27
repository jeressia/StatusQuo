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

  return (
    <div>
      {allRecords.map((record: any) => (
        <div key={record.id}>
          <p>Appointment Doctor: {record.appointment_doctor}</p>
        </div>
      ))}
    </div>
  );
}

export default AllRecords;
