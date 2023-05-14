import { Answer } from "@/types/Quiz";
import React from "react";
import classes from "../../styles/WordList.module.css";

/**
 * 単語リスト.
 *
 * TODO: 共通的に使うようにしたい
 * @param {Answer} wordList - 単語リスト.
 * @returns {JSX.Element} 単語リスト.
 */
const WordList: React.FC<{ wordList: Answer[] }> = ({ wordList }) => {
  return (
    <ul className={classes.wordListWrap}>
      {wordList.map((item, index) => {
        const { id, word, pronunciation, meaning } = item;
        return (
          <li key={id} className={classes.wordList}>
            <div className={classes.titleWrap}>
              <span className={classes.title}>
                {index + 1}. {word} [{pronunciation}]
              </span>
            </div>
            <div className={classes.meaning}>
              <span>{meaning}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default WordList;
