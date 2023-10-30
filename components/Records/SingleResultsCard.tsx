import React from "react";
import { TestResult } from "../../types/Interfaces";
import { timeNormalizer } from "../../utils/math";

import styles from "./Records.module.scss";

interface SingleResultsProps {
  result: TestResult;
}

function SingleResultsCard(props: SingleResultsProps) {
  const { result } = props;

  return (
    <div className={styles.recordCard}>
      <p className={styles.recordCardDate}>
        {timeNormalizer(result?.date_of_test)}
      </p>
      <span className={styles.recordCardDesc}>New STD Test Results Added</span>
    </div>
  );
}

export default SingleResultsCard;
