import { Word } from "@/types/Vocabulary";
import React from "react";
import VocabularyWord from "./VocabularyWord";

const VocabularyWordList: React.FC<{ bookId: string; wordList: Word[] }> = ({
  bookId,
  wordList,
}) => {
  return (
    <div>
      <ul>
        {wordList.map((word) => {
          return (
            <VocabularyWord key={word.id} bookId={bookId} wordInfo={word} />
          );
        })}
      </ul>
    </div>
  );
};

export default VocabularyWordList;
