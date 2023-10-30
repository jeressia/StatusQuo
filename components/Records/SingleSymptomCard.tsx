import React, { useState } from "react";
import { Symptom } from "../../types/Interfaces";
import { timeNormalizer } from "../../utils/math";

import styles from "./Records.module.scss";

interface SingleSymptomProps {
  symptom: Symptom;
}
function SingleSymptomCard(props: SingleSymptomProps) {
  const { symptom } = props;
  const [showImage, setShowImage] = useState(false);
  return (
    <div className={styles.recordCard}>
      <p className={styles.recordCardDate}>
        {timeNormalizer(symptom?.date_started)}
      </p>
      <span className={styles.recordCardDesc}>New Symptom Reports</span>
      {symptom.photo_upload_url !== null ? (
        <p
          className={styles.viewImgLink}
          onClick={() => setShowImage(!showImage)}
        >
          {showImage ? "Hide Image" : "View Image"}
        </p>
      ) : (
        ""
      )}
      {showImage && symptom.photo_upload_url !== null && (
        <img className={styles.symptomImg} src={symptom.photo_upload_url} />
      )}
    </div>
  );
}

export default SingleSymptomCard;
