import { Timestamp } from "firebase/firestore";

export const timeNormalizer = (timestamp: Timestamp | Date | undefined) => {
  if (typeof timestamp === "object" && timestamp instanceof Date) {
    const formattedDate = timestamp.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }

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
