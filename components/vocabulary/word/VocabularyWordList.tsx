import { Word } from "@/types/Vocabulary";
import React from "react";
import VocabularyWord from "./VocabularyWord";

const VocabularyWordList: React.FC<{ wordList: Word[] }> = ({ wordList }) => {
  return (
    <div>
      <ul>
        {wordList.map((word) => {
          return <VocabularyWord key={word.id} wordInfo={word} />;
        })}
      </ul>
    </div>
  );
};

export default VocabularyWordList;
