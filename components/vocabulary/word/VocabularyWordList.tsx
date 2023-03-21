import Loader from "@/components/layout/Loader";
import { Word } from "@/types/Vocabulary";
import React from "react";
import VocabularyWord from "./VocabularyWord";

/**
 * 単語リスト.
 *
 * @param {boolean} isLoading - ローディング中か.
 * @param {string} bookId - 単語帳id.
 * @param {Word} wordInfo - 単語情報.
 * @param {function} toggleMemorizedState - 暗記状態を更新.
 * @returns {JSX.Element} 単語リスト.
 */
const VocabularyWordList: React.FC<{
  isLoading: boolean;
  bookId: string;
  wordList: Word[];
  toggleMemorizedState: (wordInfo: Word) => void;
}> = ({ isLoading, bookId, wordList, toggleMemorizedState }) => {
  const wordListHtml = isLoading ? (
    <Loader />
  ) : (
    <div>
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
    </div>
  );
  return wordListHtml;
};

export default VocabularyWordList;
