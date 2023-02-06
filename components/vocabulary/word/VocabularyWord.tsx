import { Word } from "@/types/Vocabulary";
import React from "react";

const VocabularyWord: React.FC<{ wordInfo: Word }> = ({ wordInfo }) => {
  const { id, word, meaning } = wordInfo;
  return (
    <li id={id}>
      <p>{word}</p>
      <p>{meaning}</p>
    </li>
  );
};

export default VocabularyWord;
