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
    <div className="card">
      <p>{timeNormalizer(symptom?.date_started)}</p>
      <span>New Symptom Reports</span>
      {symptom.photo_upload_url !== null ? (
        <p className={styles.viewImgLink} onClick={() => setShowImage(true)}>
          View Image
        </p>
      ) : (
        ""
      )}
      {showImage && symptom.photo_upload_url !== null && (
        <img src={symptom.photo_upload_url} />
      )}
    </div>
  );
}

export default SingleSymptomCard;
