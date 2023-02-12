import { Word } from "@/types/Vocabulary";
import React from "react";

const VocabularyWordDetail: React.FC<{ word: Word }> = ({ word }) => {
  const { isFavorite, meanings } = word;

  const favoriteIcon = isFavorite ? (
    <div>お気に入り登録済み</div>
  ) : (
    <div>お気に入りに追加</div>
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
      <p>{word.word}</p>
      <p>{word.pronunciation}</p>
      {favoriteIcon}
      <ul>{meaningList}</ul>
    </div>
  );
};

export default VocabularyWordDetail;
