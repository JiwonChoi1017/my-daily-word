import { Word } from "@/types/Vocabulary";
import Link from "next/link";
import React from "react";

const VocabularyWord: React.FC<{ bookId: string; wordInfo: Word }> = ({
  bookId,
  wordInfo,
}) => {
  const { id, word, meaning } = wordInfo;
  return (
    <Link href={`/vocabulary/detail/${bookId}/${id}`}>
      <li id={id}>
        <p>{word}</p>
        <p>{meaning}</p>
      </li>
    </Link>
  );
};

export default VocabularyWord;
