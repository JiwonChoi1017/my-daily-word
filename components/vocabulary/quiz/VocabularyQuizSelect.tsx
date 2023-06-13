import Card from "@/components/ui/Card";
import { DoubleButtonForQuiz } from "../../ui/Button";
import React from "react";
import classes from "@/styles/VocabularyQuizSelect.module.css";

/** Props. */
interface Props {
  /** 表示するか. */
  show: boolean;
  /** 単語取得イベント. */
  fetchQuizWord: () => void;
  /** 意味取得イベント. */
  fetchQuizMeaning: () => void;
}

/**
 * クイズ選択.
 *
 * @param {Props} props
 * @returns {JSX.Element} クイズ選択.
 */
const VocabularyQuizSelect = ({
  show,
  fetchQuizWord,
  fetchQuizMeaning,
}: Props) => {
  return show ? (
    <Card>
      <div className="marginRight15">
        <div className={classes.question}>
          <span>クイズの形式を選択してください。</span>
        </div>
        <DoubleButtonForQuiz
          button={{
            first: {
              className: "first",
              text: "意味 → 単語",
              clickHandler: fetchQuizWord,
              note: "質問として意味が表示され、回答として単語が表示されます。",
            },
            second: {
              className: "first",
              text: "単語 → 意味",
              clickHandler: fetchQuizMeaning,
              note: "質問として単語が表示され、回答として意味が表示されます。",
            },
          }}
        />
      </div>
    </Card>
  ) : (
    <></>
  );
};

export default VocabularyQuizSelect;
