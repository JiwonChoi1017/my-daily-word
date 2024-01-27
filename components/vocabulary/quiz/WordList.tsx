import { Answer } from "@/types/Quiz";
import React from "react";
import WordItem from "./WordItem";
import classes from "@/styles/vocabulary/quiz/WordList.module.css";

/** Props. */
interface Props {
  /** 単語帳id. */
  bookId: string;
  /** 単語リスト. */
  wordList: Answer[];
}

/**
 * 単語リスト.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語リスト.
 */
const WordList = ({ bookId, wordList }: Props): JSX.Element => {
  return (
    <ul className={classes.wordListWrap}>
      {wordList.map((item, index) => (
        <WordItem key={index} bookId={bookId} item={item} index={index} />
      ))}
    </ul>
  );
};

export default WordList;
