import { Word } from "@/types/Vocabulary";
import { useRouter } from "next/router";
import React from "react";

const VocabularyWord: React.FC<{
  bookId: string;
  wordInfo: Word;
  toggleFavoriteState: (wordInfo: Word) => void;
}> = ({ bookId, wordInfo, toggleFavoriteState }) => {
  const { id, word, isFavorite, meanings } = wordInfo;
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

  const onClickFavoriteButtonHandler = () => {
    toggleFavoriteState({ ...wordInfo, isFavorite: !isFavorite });
  };

  const favoriteIcon = isFavorite ? (
    <div onClick={onClickFavoriteButtonHandler}>お気に入り登録済み</div>
  ) : (
    <div onClick={onClickFavoriteButtonHandler}>お気に入りに追加</div>
  );

  const meaningList = meanings.map((meaning, index) => {
    return <li key={`${meaning}_${index}`}>{meaning.meaning}</li>;
  });

  return (
    <li
      id={id}
      style={{ cursor: "pointer" }}
      onClick={(e: React.MouseEvent<HTMLLIElement>) => {
        moveToDetailPage(e);
      }}
    >
      <p>{word}</p>
      <div className="_ignoreClick">{favoriteIcon}</div>
      <ul>{meaningList}</ul>
    </li>
  );
};

export default VocabularyWord;
