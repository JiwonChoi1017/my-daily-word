import React from "react";

const VocabularyQuizList: React.FC<{
  show: boolean;
  currentQuizNumber: number;
}> = ({ show, currentQuizNumber }) => {
  return show ? <>hi</> : <></>;
};

export default VocabularyQuizList;
