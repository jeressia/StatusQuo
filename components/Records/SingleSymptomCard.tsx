import React from "react";
import { Symptom } from "../../types/Interfaces";
import { timeNormalizer } from "../../utils/math";

interface SingleSymptomProps {
  symptom: Symptom;
}
function SingleSymptomCard(props: SingleSymptomProps) {
  const { symptom } = props;

  return (
    <div className="card">
      <p>{timeNormalizer(symptom?.date_started)}</p>
      <span>New Symptom Reports</span>
      {symptom.photo_upload_url !== null ? <a href="">View Image</a> : ""}
    </div>
  );
}

export default SingleSymptomCard;
