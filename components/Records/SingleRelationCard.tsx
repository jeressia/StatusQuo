import React from "react";
import { SexualRelations } from "../../types/Interfaces";
import { timeNormalizer } from "../../utils/math";

import styles from "./Records.module.scss";

interface SingleRelationProps {
  relation: SexualRelations;
}

function SingleRelationCard(props: SingleRelationProps) {
  const { relation } = props;

  return (
    <div className={styles.recordCard}>
      <p className={styles.recordCardDate}>
        {timeNormalizer(relation?.date_of_relations)}
      </p>
      <span className={styles.recordCardDesc}>
        {relation.isProtected ? "Protected" : "Unprotected"} Sex
      </span>
    </div>
  );
}

export default SingleRelationCard;
