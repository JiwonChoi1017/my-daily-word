import Card from "@/components/layout/Card";
import Loader from "@/components/layout/Loader";
import { Word } from "@/types/Vocabulary";
import { useRouter } from "next/router";
import React from "react";

/**
 * 単語.
 *
 * @param {boolean} isLoading - ローディング中か.
 * @param {string} bookId - 単語帳id.
 * @param {Word} wordInfo - 単語情報.
 * @param {function} toggleMemorizedState - 暗記状態を更新.
 * @returns {JSX.Element} 単語.
 */
const VocabularyWord: React.FC<{
  isLoading?: boolean;
  bookId: string;
  wordInfo: Word;
  toggleMemorizedState: (wordInfo: Word) => void;
}> = ({ isLoading, bookId, wordInfo, toggleMemorizedState }) => {
  const { id, word, pronunciation, isMemorized, meanings } = wordInfo;
  const router = useRouter();

  const moveToDetailPage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // MEMO: event.target と event.currentTarget の違い
    // event.target: イベントが発生した要素を表す.
    // event.currentTarget: イベントハンドラが登録された要素を表す.
    const target = e.target as HTMLElement;
    if (target.closest("._ignoreClick")) return;

    router.push(`/vocabulary/detail/${bookId}/${id}`);
  };

  const onClickMemorizedButtonHandler = () => {
    toggleMemorizedState({ ...wordInfo, isMemorized: !isMemorized });
  };
  // 暗記フラグ
  const memorizedFlag = isMemorized ? (
    <div onClick={onClickMemorizedButtonHandler}>暗記</div>
  ) : (
    <div onClick={onClickMemorizedButtonHandler}>未暗記</div>
  );
  // 意味リスト
  const meaningList = meanings.map((meaning, index) => {
    return (
      <li key={`${meaning}_${index}`}>
        {index + 1}. {meaning.meaning}
      </li>
    );
  });

  return (
    <Card>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          id={id}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            moveToDetailPage(e);
          }}
        >
          <div className="title__wrap">
            <span className="title">{word}</span>
            <span>[{pronunciation}]</span>
          </div>
          <div className="_ignoreClick">{memorizedFlag}</div>
          <ul className="description">{meaningList}</ul>
        </div>
      )}
    </Card>
  );
};

export default VocabularyWord;
