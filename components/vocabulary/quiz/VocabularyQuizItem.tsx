import { Answer, QuizKind } from "@/types/Quiz";
import React, { useState } from "react";

import Card from "@/components/ui/Card";
import { CheckAnswerIcon } from "@/components/icon/Icon";
import { QUIZ_KIND } from "@/constants/quizConstants";
import classes from "@/styles/VocabularyQuizItem.module.css";

/** Props. */
interface Props {
  /** 表示するか. */
  show: boolean;
  /** クイズ種別. */
  quizKind: QuizKind;
  /** 現在のクイズインデックス. */
  currentQuizIndex: number;
  /** 回答リスト. */
  answersList: string[][];
  /** 正解リスト. */
  correctAnswerList: Answer[];
  /** 回答をチェック. */
  checkAnswer: (answer: string) => void;
}

/**
 * 単語クイズアイテム.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語クイズアイテム.
 */
const VocabularyQuizItem = ({
  show,
  quizKind,
  currentQuizIndex,
  answersList,
  correctAnswerList,
  checkAnswer,
}: Props) => {
  if (!show) {
    return <></>;
  }

  const [checkedValue, setCheckedValue] = useState<number>(0);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  // チェックボックスクリックイベントハンドラ
  const onClickCheckboxHandler = (answer: string, index: number) => {
    setCheckedValue(index);
    setShowIcon(true);
    checkAnswer(answer);
    setTimeout(() => {
      setCheckedValue(0);
      setShowIcon(false);
    }, 1000);
  };

  const currentQuestionItem = correctAnswerList[currentQuizIndex];
  const question =
    quizKind === QUIZ_KIND.word
      ? currentQuestionItem.meaning
      : currentQuestionItem.word;
  const correctAnswer =
    quizKind === QUIZ_KIND.word
      ? currentQuestionItem.word
      : currentQuestionItem.meaning;
  const answerList = answersList[currentQuizIndex];

  return (
    <Card needToChangeCursorToDefault={true}>
      <span className={classes.question}>
        {currentQuizIndex + 1}. {question}
      </span>
      <ul className={classes.answerList}>
        {answerList.map((answer, index) => {
          const newIndex = index + 1;
          return (
            <li key={newIndex} className={classes.container}>
              <input
                className={classes.checkbox}
                type="checkbox"
                checked={checkedValue === newIndex}
                onChange={() => {
                  return;
                }}
              />
              <span
                className={classes.checkmark}
                onClick={() => {
                  onClickCheckboxHandler(answer, newIndex);
                }}
              ></span>
              <span className={classes.answerText}>{answer}</span>
              <div className={classes.checkAnswerIconWrap}>
                {showIcon && checkedValue === newIndex && (
                  <CheckAnswerIcon
                    checkedAnswer={answer}
                    correctAnswer={correctAnswer}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default VocabularyQuizItem;
