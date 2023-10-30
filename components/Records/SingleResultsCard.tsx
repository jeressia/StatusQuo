import React from "react";
import { TestResult } from "../../types/Interfaces";
import { timeNormalizer } from "../../utils/math";

interface SingleResultsProps {
  result: TestResult;
}

function SingleResultsCard(props: SingleResultsProps) {
  const { result } = props;

  return (
    <div className="card">
      <p>{timeNormalizer(result?.date_of_test)}</p>
      <span>New STD Test Results Added</span>
    </div>
  );
}

export default SingleResultsCard;
