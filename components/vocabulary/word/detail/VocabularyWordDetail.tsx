import { Word } from "@/types/Vocabulary";
import React from "react";

const VocabularyWordDetail: React.FC<{ word: Word }> = ({ word }) => {
  return (
    <div>
      <p>{word.word}</p>
      <p>{word.meaning}</p>
      <p>{word.pronunciation}</p>
      <ul>
        {word.examples.map((example, idx) => {
          return <li key={`example_${idx}`}>{example}</li>;
        })}
      </ul>
    </div>
  );
};

export default VocabularyWordDetail;
