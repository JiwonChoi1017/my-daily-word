import Link from "next/link";
import React from "react";

const VocabularyQuizSelectModal: React.FC<{
  show: boolean;
  fetchQuizWord: () => void;
  fetchQuizMeaning: () => void;
}> = ({ show, fetchQuizWord, fetchQuizMeaning }) => {
  return show ? (
    <>
      <button onClick={fetchQuizWord}>word</button>
      <button onClick={fetchQuizMeaning}>meaning</button>
    </>
  ) : (
    <></>
  );
};

export default VocabularyQuizSelectModal;
