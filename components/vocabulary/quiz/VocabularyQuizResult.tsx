import React from "react";

const VocabularyQuizResult: React.FC<{
  show: boolean;
  correctAnswerList: { id: string; word: string; meaning: string }[];
  moveToWordListPage: () => void;
  showModalHandler: () => void;
}> = ({ show, correctAnswerList, moveToWordListPage, showModalHandler }) => {
  const correctAnswerListHtml = (
    <div>
      <ul>
        {correctAnswerList.map((answer) => {
          return (
            <li key={answer.id}>
              <p>{answer.word}</p>
              <p>{answer.meaning}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const buttonHtml = (
    <div>
      <button onClick={moveToWordListPage}>単語リストへ</button>
      <button onClick={showModalHandler}>次に進む</button>
    </div>
  );

  const resultHtml = show ? (
    <div>
      <h2>Quiz Result</h2>
      {correctAnswerListHtml}
      {buttonHtml}
    </div>
  ) : (
    <></>
  );

  return resultHtml;
};

export default VocabularyQuizResult;
