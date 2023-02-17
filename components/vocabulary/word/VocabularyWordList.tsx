import { Word } from "@/types/Vocabulary";
import React from "react";
import VocabularyWord from "./VocabularyWord";

const VocabularyWordList: React.FC<{
  bookId: string;
  wordList: Word[];
  toggleMemorizedState: (wordInfo: Word) => void;
  loading: boolean;
}> = ({ bookId, wordList, toggleMemorizedState, loading }) => {
  const wordListHtml = loading ? (
    <div>Loading...</div>
  ) : (
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
  return wordListHtml;
};

export default VocabularyWordList;
