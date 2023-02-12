import { Word } from "@/types/Vocabulary";
import React from "react";
import VocabularyWord from "./VocabularyWord";

const VocabularyWordList: React.FC<{
  bookId: string;
  wordList: Word[];
  toggleFavoriteState: (wordInfo: Word) => void;
}> = ({ bookId, wordList, toggleFavoriteState }) => {
  return (
    <div>
      <ul>
        {wordList.map((word) => {
          return (
            <VocabularyWord
              key={word.id}
              bookId={bookId}
              wordInfo={word}
              toggleFavoriteState={toggleFavoriteState}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default VocabularyWordList;
