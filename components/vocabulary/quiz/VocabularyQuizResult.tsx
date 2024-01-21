import { Answer } from "@/types/Quiz";
import Card from "@/components/ui/Card";
import { DoubleButton } from "../../ui/Button";
import React from "react";
import WordList from "@/components/vocabulary/quiz/WordList";

/** Props. */
interface Props {
  /** 表示するか. */
  show: boolean;
  /** 正解リスト. */
  correctAnswerList: Answer[];
  /** 単語リストへ移動. */
  moveToWordListPage: () => void;
  /** クイズセレクトを表示. */
  showQuizSelect: () => void;
}

/**
 * 単語クイズ結果.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語クイズ結果.
 */
const VocabularyQuizResult = ({
  show,
  correctAnswerList,
  moveToWordListPage,
  showQuizSelect,
}: Props) => {
  // 結果要素
  const resultElement = show ? (
    <Card needToChangeCursorToDefault={true}>
      <div className="marginRight15">
        <WordList wordList={correctAnswerList} />
        <DoubleButton
          button={{
            first: {
              className: "button",
              text: "単語リストへ",
              clickHandler: moveToWordListPage,
            },
            second: {
              className: "button",
              text: "次に進む",
              clickHandler: showQuizSelect,
            },
          }}
        />
      </div>
    </Card>
  ) : (
    <></>
  );

  return resultElement;
};

export default VocabularyQuizResult;
