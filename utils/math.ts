import { Timestamp } from "firebase/firestore";

export const timeNormalizer = (timestamp: Timestamp | undefined) => {
  const date = timestamp?.toDate();
  if (date) {
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }
  return "";
};
