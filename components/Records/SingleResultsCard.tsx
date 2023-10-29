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
      <span>{result.test_type}</span>
    </div>
  );
}

export default SingleResultsCard;
