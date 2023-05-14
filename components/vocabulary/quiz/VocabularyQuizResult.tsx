import { Answer } from "@/types/Quiz";
import { Button } from "../../ui/Button";
import Card from "@/components/ui/Card";
import React from "react";
import WordList from "@/components/vocabulary/quiz/WordList";
import classes from "../../../styles/Button.module.css";

/**
 * 単語クイズ結果.
 *
 * @param {boolean} show - 表示するか.
 * @param {Answer[]} correctAnswerList - 正解リスト.
 * @param {function} moveToWordListPage - 単語リストへ移動.
 * @param {function} showQuizSelect - クイズセレクトを表示.
 * @returns {JSX.Element} 単語クイズ結果.
 */
const VocabularyQuizResult: React.FC<{
  show: boolean;
  correctAnswerList: Answer[];
  moveToWordListPage: () => void;
  showQuizSelect: () => void;
}> = ({ show, correctAnswerList, moveToWordListPage, showQuizSelect }) => {
  // ボタン要素
  const buttonElement = (
    <div className={classes.button__wrap}>
      <Button
        className="button"
        text={"単語リストへ"}
        clickHandler={moveToWordListPage}
      />
      <Button
        className="button"
        text={"次に進む"}
        clickHandler={showQuizSelect}
      />
    </div>
  );
  // 結果要素
  const resultElement = show ? (
    <Card>
      <WordList wordList={correctAnswerList} />
      {buttonElement}
    </Card>
  ) : (
    <></>
  );

  return resultElement;
};

export default VocabularyQuizResult;
