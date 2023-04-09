import Card from "../ui/Card";
import React from "react";
import classes from "../ui/Button.module.css";
import Button from "../ui/Button";
import { useRouter } from "next/router";
import { ErrorInfo } from "@/types/Error";

/**
 * 単語クイズの条件を満たしていないエラー.
 *
 * @param {ErrorInfo} errorInfo - エラー情報.
 * @param {string} bookId - 単語帳id.
 * @returns {JSX.Element} 単語クイズの条件を満たしていないエラー.
 */
const NotEnoughWord: React.FC<{ errorInfo: ErrorInfo; bookId: string }> = ({
  errorInfo,
  bookId,
}) => {
  // ルーター
  const router = useRouter();
  // 単語フォームに遷移
  const moveToVocabularyWordForm = () => {
    router.push(`/vocabulary/word/form?book_id=${bookId}`);
  };
  // 単語フォームボタン
  const wordFormButton = (
    <div className={classes.button__wrap}>
      <Button
        className={`${classes.button} marginTop20`}
        text={"単語を追加"}
        clickHandler={moveToVocabularyWordForm}
      />
    </div>
  );

  return (
    <Card isError={true}>
      <div>{errorInfo.message}</div>
      {wordFormButton}
    </Card>
  );
};

export default NotEnoughWord;
