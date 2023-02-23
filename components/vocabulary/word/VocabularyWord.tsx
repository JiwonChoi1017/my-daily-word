import { Word } from "@/types/Vocabulary";
import { useRouter } from "next/router";
import React from "react";

const VocabularyWord: React.FC<{
  bookId: string;
  wordInfo: Word;
  toggleMemorizedState: (wordInfo: Word) => void;
}> = ({ bookId, wordInfo, toggleMemorizedState }) => {
  const { id, word, isMemorized, meanings } = wordInfo;
  const router = useRouter();

  const moveToDetailPage = (e: React.MouseEvent<HTMLLIElement>) => {
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
  const memorizedIcon = isMemorized ? (
    <div onClick={onClickMemorizedButtonHandler}>暗記</div>
  ) : (
    <div onClick={onClickMemorizedButtonHandler}>未暗記</div>
  );

  const meaningList = meanings.map((meaning, index) => {
    return <li key={`${meaning}_${index}`}>{meaning.meaning}</li>;
  });

  return (
    <>
      <li
        id={id}
        style={{ cursor: "pointer" }}
        onClick={(e: React.MouseEvent<HTMLLIElement>) => {
          moveToDetailPage(e);
        }}
      >
        <p>{word}</p>
        <div className="_ignoreClick">{memorizedIcon}</div>
        <ul>{meaningList}</ul>
      </li>
      <br />
    </>
  );
};

export default VocabularyWord;
