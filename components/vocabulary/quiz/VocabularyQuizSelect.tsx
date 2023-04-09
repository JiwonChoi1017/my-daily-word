import Card from "@/components/ui/Card";
import React from "react";
import classes from "../../ui/Button.module.css";
import Button from "../../ui/Button";

/**
 * クイズ選択.
 *
 * @param {boolean} show - 表示するか.
 * @param {function} fetchQuizWord - 単語取得イベント.
 * @param {function} fetchQuizMeaning - 意味取得イベント.
 * @returns {JSX.Element} クイズ選択.
 */
const VocabularyQuizSelect: React.FC<{
  show: boolean;
  fetchQuizWord: () => void;
  fetchQuizMeaning: () => void;
}> = ({ show, fetchQuizWord, fetchQuizMeaning }) => {
  return show ? (
    <Card className={"textAlignCenter"}>
      <div className={classes.button__wrap}>
        <Button
          className={`${classes.button}`}
          text={"単語"}
          clickHandler={fetchQuizWord}
        />
        <Button
          className={`${classes.button} marginTop20`}
          text={"意味"}
          clickHandler={fetchQuizMeaning}
        />
      </div>
    </Card>
  ) : (
    <></>
  );
};

export default VocabularyQuizSelect;
