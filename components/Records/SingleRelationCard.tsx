import React from "react";
import { SexualRelations } from "../../types/Interfaces";
import { timeNormalizer } from "../../utils/math";

interface SingleRelationProps {
  relation: SexualRelations;
}

function SingleRelationCard(props: SingleRelationProps) {
  const { relation } = props;

  return (
    <div className="card">
      <p>{timeNormalizer(relation?.date_of_relations)}</p>
      <span>{relation.isProtected ? "Protected" : "Unprotected"} Sex</span>
    </div>
  );
}

export default SingleRelationCard;
