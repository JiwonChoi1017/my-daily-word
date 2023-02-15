import { Word } from "@/types/Vocabulary";
import React from "react";
import VocabularyWord from "./VocabularyWord";

const VocabularyWordList: React.FC<{
  bookId: string;
  wordList: Word[];
  toggleMemorizedState: (wordInfo: Word) => void;
}> = ({ bookId, wordList, toggleMemorizedState }) => {
  return (
    <div>
      <ul>
        {wordList.map((word) => {
          return (
            <VocabularyWord
              key={word.id}
              bookId={bookId}
              wordInfo={word}
              toggleMemorizedState={toggleMemorizedState}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default VocabularyWordList;
