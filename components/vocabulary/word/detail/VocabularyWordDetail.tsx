import { Word } from "@/types/Vocabulary";
import React from "react";

const VocabularyWordDetail: React.FC<{
  wordInfo: Word;
  toggleFavoriteState: (wordInfo: Word) => void;
}> = ({ wordInfo, toggleFavoriteState }) => {
  const { isFavorite, meanings } = wordInfo;

  const onClickFavoriteButtonHandler = () => {
    toggleFavoriteState({ ...wordInfo, isFavorite: !isFavorite });
  };

  const favoriteIcon = isFavorite ? (
    <div style={{ cursor: "pointer" }} onClick={onClickFavoriteButtonHandler}>
      お気に入り登録済み
    </div>
  ) : (
    <div style={{ cursor: "pointer" }} onClick={onClickFavoriteButtonHandler}>
      お気に入りに追加
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
      {favoriteIcon}
      <ul>{meaningList}</ul>
    </div>
  );
};

export default VocabularyWordDetail;
