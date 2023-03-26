import Loader from "@/components/layout/Loader";
import { Word } from "@/types/Vocabulary";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import React from "react";
import VocabularyWord from "./VocabularyWord";
import VocabularyWordSearchBox from "./VocabularyWordSearchBox";

/**
 * 単語リスト.
 *
 * @param {boolean} isLoading - ローディング中か.
 * @param {string} bookId - 単語帳id.
 * @param {Word} wordInfo - 単語情報.
 * @param {function} filterWordList - 単語リストをフィルター.
 * @param {function} toggleMemorizedState - 暗記状態を更新.
 * @returns {JSX.Element} 単語リスト.
 */
const VocabularyWordList: React.FC<{
  isLoading: boolean;
  bookId: string;
  wordList: Word[];
  filterWordList: (keyword: string) => void;
  toggleMemorizedState: (wordInfo: Word) => void;
}> = ({
  isLoading,
  bookId,
  wordList,
  filterWordList,
  toggleMemorizedState,
}) => {
  // ルーター
  const router = useRouter();
  // 単語フォームに遷移
  const moveToVocabularyWordForm = () => {
    router.push(`/vocabulary/word/form?book_id=${bookId}`);
  };
  // 単語追加アイコン
  const addWordIcon = (
    <div className="addIcon" onClick={moveToVocabularyWordForm}>
      <FaPlus />
    </div>
  );
  // 単語リスト
  const wordListHtml = isLoading ? (
    <Loader />
  ) : (
    <>
      <div style={{ justifyContent: "center" }}>
        <VocabularyWordSearchBox filterWordList={filterWordList} />
        {addWordIcon}
      </div>
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
    </>
  );
  return wordListHtml;
};

export default VocabularyWordList;
