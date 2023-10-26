import { Timestamp } from "firebase/firestore";

export const timeNormalizer = (timestamp: Date | undefined) => {
  if (timestamp) {
    const conversion = timestamp;
    const formattedDate = conversion.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }
  return "";
};
