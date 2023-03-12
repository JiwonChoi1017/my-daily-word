import React from "react";

const VocabularyQuizResult: React.FC<{ show: boolean }> = ({ show }) => {
  const resultHtml = show ? (
    <div>
      <h2>Quiz Result</h2>
    </div>
  ) : (
    <></>
  );

  return resultHtml;
};

export default VocabularyQuizResult;
