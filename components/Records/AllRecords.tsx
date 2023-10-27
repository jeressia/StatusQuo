import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

// interface AllRecordsData {
//   userId: string | null;
// }

function AllRecords() {
  // props: AllRecordsData
  // const { userId } = props;
  const userId = "waCkoBxKkeXEO1dCiPLoOAUTF4A3";
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
      console.log("Data from all collections for user:", combinedUserData);
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
      where("user_id", "==", "waCkoBxKkeXEO1dCiPLoOAUTF4A3")
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
    setAllRecords(allUserData);
  };

  console.log("allRecords", allRecords);
  return <div>AllRecords</div>;
}

export default AllRecords;
