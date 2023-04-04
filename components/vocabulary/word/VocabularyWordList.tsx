import Loader from "@/components/layout/Loader";
import { Word } from "@/types/Vocabulary";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import VocabularyWord from "./VocabularyWord";
import NotFoundWord from "@/components/error/NotFoundWord";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

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
  // キーワードのref
  const keywordRef = useRef<HTMLInputElement>(null);
  // キーワード変更イベントハンドラ
  const onChangeKeywordHandler = () => {
    if (!keywordRef.current) return;

    const keywordValue = keywordRef.current.value;
    filterWordList(keywordValue);
  };
  // 単語フォームに遷移
  const moveToVocabularyWordForm = () => {
    router.push(`/vocabulary/word/form?book_id=${bookId}`);
  };
  // 検索窓
  const searchBox = (
    <input ref={keywordRef} type="text" onChange={onChangeKeywordHandler} />
  );
  // 単語追加アイコン
  const addWordIcon = (
    <div className="addIcon alignRight" onClick={moveToVocabularyWordForm}>
      <FaPlus />
    </div>
  );
  const wordTopModule = (
    <div className="wordTopModule">
      {searchBox}
      {addWordIcon}
    </div>
  );
  // 単語リスト要素
  const wordListElement = (
    <>
      {wordTopModule}
      {isLoading ? (
        <Loader />
      ) : !wordList.length ? (
        <NotFoundWord />
      ) : (
        <>
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
          <ScrollToTopButton />
        </>
      )}
    </>
  );
  return wordListElement;
};

export default VocabularyWordList;
