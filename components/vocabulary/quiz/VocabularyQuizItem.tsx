import React from "react";

const VocabularyQuizItem: React.FC<{
  show: boolean;
  quizKind: "word" | "meaning";
  currentQuizNumber: number;
  answersList: string[][];
  correctAnswerList: { id: string; word: string; meaning: string }[];
}> = ({
  show,
  quizKind,
  currentQuizNumber,
  answersList,
  correctAnswerList,
}) => {
  if (!show) {
    return <></>;
  }

  const currentQuestionItem = correctAnswerList[currentQuizNumber];
  const question =
    quizKind === "word"
      ? currentQuestionItem.meaning
      : currentQuestionItem.word;
  const answerList = answersList[currentQuizNumber];

  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {answerList.map((answer) => {
          return <li key={answer}>{answer}</li>;
        })}
      </ul>
    </div>
  );
};

export default VocabularyQuizItem;
