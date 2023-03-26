import Card from "@/components/ui/Card";
import Loader from "@/components/layout/Loader";
import { Word } from "@/types/Vocabulary";
import Link from "next/link";
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

/**
 * 単語詳細.
 *
 * @param {boolean} isLoading - (任意)ローディング中か.
 * @param {string} bookId - 単語帳id.
 * @param {Word} wordInfo - 単語情報.
 * @param {function} toggleMemorizedState - 暗記状態を更新.
 * @param {function} deleteWord - 単語削除.
 * @returns {JSX.Element} 単語詳細.
 */
const VocabularyWordDetail: React.FC<{
  isLoading: boolean;
  bookId: string;
  wordInfo: Word;
  toggleMemorizedState: (wordInfo: Word) => void;
  deleteWord: () => void;
}> = ({ isLoading, bookId, wordInfo, toggleMemorizedState, deleteWord }) => {
  const { isMemorized, meanings } = wordInfo;
  // 暗記状態更新イベントハンドラ
  const onClickMemorizedButtonHandler = () => {
    toggleMemorizedState({ ...wordInfo, isMemorized: !isMemorized });
  };
  // 単語削除イベントハンドラ
  const onClickDeleteButtonHandler = () => {
    deleteWord();
  };
  // 暗記フラグ
  const bookmark = (
    <div className="bookmark" onClick={onClickMemorizedButtonHandler}>
      {isMemorized ? <FaBookmark /> : <FaRegBookmark />}
    </div>
  );
  // 意味リスト
  const meaningList = meanings.map((meaning, index) => {
    return (
      <li key={`${meaning.meaning}_${index}`}>
        {index + 1}. {meaning.meaning}
        {meaning.examples && (
          <ul className="example">
            <span>例</span>
            {meaning.examples.map((example, index) => {
              return <li key={`${example}_${index}`}>{example}</li>;
            })}
          </ul>
        )}
      </li>
    );
  });

  return (
    <Card>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="title__wrap">
            <span className="title">{wordInfo.word}</span>
            <span>[{wordInfo.pronunciation}]</span>
          </div>
          {bookmark}
          <ul className="description">{meaningList}</ul>
          <Link
            href={`/vocabulary/word/form/modify?book_id=${bookId}&word_id=${wordInfo.id}`}
          >
            修正
          </Link>
          <button onClick={onClickDeleteButtonHandler}>削除</button>
        </div>
      )}
    </Card>
  );
};

export default VocabularyWordDetail;
