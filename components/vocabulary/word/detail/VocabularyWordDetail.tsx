import { Word } from "@/types/Vocabulary";
import Link from "next/link";
import React from "react";

const VocabularyWordDetail: React.FC<{
  bookId: string;
  wordInfo: Word;
  toggleMemorizedState: (wordInfo: Word) => void;
}> = ({ bookId, wordInfo, toggleMemorizedState }) => {
  const { isMemorized, meanings } = wordInfo;

  const onClickMemorizedButtonHandler = () => {
    toggleMemorizedState({ ...wordInfo, isMemorized: !isMemorized });
  };

  // 暗記フラグ
  const memorizedIcon = isMemorized ? (
    <div style={{ cursor: "pointer" }} onClick={onClickMemorizedButtonHandler}>
      暗記
    </div>
  ) : (
    <div style={{ cursor: "pointer" }} onClick={onClickMemorizedButtonHandler}>
      未暗記
    </div>
  );

  const meaningList = meanings.map((meaning, index) => {
    return (
      <li key={`${meaning.meaning}_${index}`}>
        <p>{meaning.meaning}</p>
        {meaning.examples && (
          <ul>
            {meaning.examples.map((example, index) => {
              return <li key={`${example}_${index}`}>{example}</li>;
            })}
          </ul>
        )}
      </li>
    );
  });

  return (
    <div>
      <p>{wordInfo.word}</p>
      <p>{wordInfo.pronunciation}</p>
      {memorizedIcon}
      <ul>{meaningList}</ul>
      <Link
        href={`/vocabulary/word/form/modify?book_id=${bookId}&word_id=${wordInfo.id}`}
      >
        修正
      </Link>
      <button>削除</button>
    </div>
  );
};

export default VocabularyWordDetail;
