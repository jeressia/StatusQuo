import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

import { app, db } from "../../utils/firebase"; // Import your Firebase app instance

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query; // Assuming you want to get the userId from the query parameters

  const usersCollection = collection(db, "appointments");

  const cityRef = collection(db, "appointments");

  const q = query(usersCollection);

  getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });

  // const appointmentsRef = collection(db, "appointments");
  // const q = query(appointmentsRef, where("userUID", "==", userId));

  // try {
  //   const querySnapshot = await getDocs(q);
  //   const appointments: any = [];
  //   querySnapshot.forEach((doc) => {
  //     appointments.push({ id: doc.id, ...doc.data() });
  //   });
  //   console.log("appointments", appointments);
  //   res.status(200).json(appointments);
  // } catch (error) {
  //   res.status(500).json({ error: "Error retrieving user appointments" });
  //   console.log("error", error);
  // }
};
