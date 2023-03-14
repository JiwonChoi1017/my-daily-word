import { QUIZ_KIND } from "@/constants/quizConstans";
import { QuizKind } from "@/types/Quiz";
import React, { useState } from "react";

const VocabularyQuizItem: React.FC<{
  show: boolean;
  quizKind: QuizKind;
  currentQuizIndex: number;
  answersList: string[][];
  correctAnswerList: { id: string; word: string; meaning: string }[];
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
    <div>
      <h2>{question}</h2>
      <ul>
        {answerList.map((answer, index) => {
          const newIndex = index + 1;
          return (
            <li key={newIndex}>
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
                <div>{answer === correctAnswer ? "correct" : "wrong"}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VocabularyQuizItem;
