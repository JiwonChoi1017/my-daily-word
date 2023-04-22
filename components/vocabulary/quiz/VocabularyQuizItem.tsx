import Card from "@/components/ui/Card";
import { CheckAnswerIcon } from "@/components/icon/Icon";
import { QUIZ_KIND } from "@/constants/quizConstants";
import { Answer, QuizKind } from "@/types/Quiz";
import React, { useState } from "react";

/**
 * 単語クイズアイテム.
 *
 * @param {boolean} show - 表示するか.
 * @param {QuizKind} quizKind - クイズ種別.
 * @param {number} currentQuizIndex - 現在のクイズインデックス.
 * @param {string[][]} answersList - 回答リスト.
 * @param {Answer[]} correctAnswerList - 正解リスト.
 * @param {function} checkAnswer - 回答をチェック.
 * @returns {JSX.Element} 単語クイズアイテム.
 */
const VocabularyQuizItem: React.FC<{
  show: boolean;
  quizKind: QuizKind;
  currentQuizIndex: number;
  answersList: string[][];
  correctAnswerList: Answer[];
  checkAnswer: (answer: string) => void;
}> = ({
  show,
  quizKind,
  currentQuizIndex,
  answersList,
  correctAnswerList,
  checkAnswer,
}) => {
  if (!show) {
    return <></>;
  }

  const [checkedValue, setCheckedValue] = useState<number>(0);
  const [showIcon, setShowIcon] = useState<boolean>(false);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!e.currentTarget) return;
    setCheckedValue(index);
    setShowIcon(true);
    checkAnswer(e.currentTarget.value);
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
    <Card>
      <h2>{question}</h2>
      <ul>
        {answerList.map((answer, index) => {
          const newIndex = index + 1;
          return (
            <li key={newIndex} className="marginBottom15 alignItemsCenter">
              <input
                type="checkbox"
                value={answer}
                checked={checkedValue === newIndex}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeHandler(e, newIndex);
                }}
              />
              {answer}
              {showIcon && checkedValue === newIndex && (
                <CheckAnswerIcon
                  checkedAnswer={answer}
                  correctAnswer={correctAnswer}
                />
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default VocabularyQuizItem;
