import { Timestamp } from "firebase/firestore";

export const timeNormalizer = (timestamp: Timestamp | undefined) => {
  if (timestamp) {
    const conversion = timestamp.toDate();
    const formattedDate = conversion.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }
  return "";
};
