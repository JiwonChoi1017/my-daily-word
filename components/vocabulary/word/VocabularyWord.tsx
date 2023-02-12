import { Word } from "@/types/Vocabulary";
import Link from "next/link";
import React from "react";

const VocabularyWord: React.FC<{ bookId: string; wordInfo: Word }> = ({
  bookId,
  wordInfo,
}) => {
  const { id, word, isFavorite, meanings } = wordInfo;

  const favoriteIcon = isFavorite ? (
    <div>お気に入り登録済み</div>
  ) : (
    <div>お気に入りに追加</div>
  );

  const meaningList = meanings.map((meaning, index) => {
    return <li key={`${meaning}_${index}`}>{meaning.meaning}</li>;
  });

  return (
    // TODO: お気に入りボタンや暗記済みボタンをクリックした場合は遷移させたくないので、Linkをやめてrouter.pushで遷移させる必要あり
    <Link href={`/vocabulary/detail/${bookId}/${id}`}>
      <li id={id}>
        <p>{word}</p>
        {favoriteIcon}
        <ul>{meaningList}</ul>
      </li>
    </Link>
  );
};

export default VocabularyWord;
