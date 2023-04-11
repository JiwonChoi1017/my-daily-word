import { ERROR_STATUS } from "@/constants/constants";
import { ErrorInfo } from "@/types/Error";
import React from "react";
import Card from "../ui/Card";
import classes from "../../styles/Button.module.css";
import { Button } from "../ui/Button";
import { useRouter } from "next/router";

/**
 * Not Found.
 *
 * @param {ErrorInfo} errorInfo - エラー情報.
 * @returns {JSX.Element} Not Found.
 */
const NotFound: React.FC<{ errorInfo: ErrorInfo }> = ({ errorInfo }) => {
  const { status, message } = errorInfo;
  // ルーター
  const router = useRouter();
  // 単語帳フォームに遷移
  const moveToVocabularyBookForm = () => {
    router.push("/vocabulary/book/form");
  };
  // 単語帳フォームボタン
  const bookFormButton =
    status === ERROR_STATUS.NOT_FOUND_BOOK ? (
      <div className={classes.button__wrap}>
        <Button
          className="button"
          text={"単語帳を追加"}
          clickHandler={moveToVocabularyBookForm}
        />
      </div>
    ) : (
      <></>
    );
  // 単語帳リストに遷移
  const moveToVocabularyBookList = () => {
    router.push("/vocabulary/list?page=1");
  };
  // 単語帳リストボタン
  const bookListButton =
    status === ERROR_STATUS.NOT_FOUND_WORD ? (
      <div className={classes.button__wrap}>
        <Button
          className="button"
          text={"単語帳リストへ移動"}
          clickHandler={moveToVocabularyBookList}
        />
      </div>
    ) : (
      <></>
    );

  return (
    <Card isError={true}>
      <div
        className="marginBottom20"
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
      {bookFormButton}
      {bookListButton}
    </Card>
  );
};

export default NotFound;
