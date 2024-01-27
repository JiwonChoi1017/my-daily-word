import { Answer } from "@/types/Quiz";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";
import classes from "@/styles/vocabulary/quiz/WordItem.module.css";

/** Props. */
interface Props {
  /** 単語帳id. */
  bookId: string;
  /** 単語. */
  item: Answer;
  /** インデックス. */
  index: number;
}

/**
 * 単語.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語.
 */
const WordItem = ({ bookId, item, index }: Props): JSX.Element => {
  const { id, word, pronunciation, meaning } = item;

  return (
    <li key={id} className={classes.wordContainer}>
      <div className={classes.wordWrap}>
        <div className={classes.titleWrap}>
          <span className={classes.title}>
            {index + 1}. {word} 【{pronunciation}】
          </span>
        </div>
        <div className={classes.meaning}>
          <span>{meaning}</span>
        </div>
      </div>
      <Link
        href={`/vocabulary/detail/${bookId}/${id}`}
        className={classes.buttonContainer}
        target="_blank"
      >
        <Button className="second" text="詳細を見る" />
      </Link>
    </li>
  );
};

export default WordItem;
