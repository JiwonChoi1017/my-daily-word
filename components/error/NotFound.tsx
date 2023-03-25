import { ERROR_STATUS } from "@/constants/constants";
import { ErrorInfo } from "@/types/Error";
import React from "react";
import Card from "../ui/Card";
import classes from "../../styles/Button.module.css";
import Button from "../layout/Button";
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

  const bookFormButton =
    status === ERROR_STATUS.NOT_FOUND_BOOK ? (
      <div className={classes.button__wrap}>
        <Button
          className={`${classes.button} marginTop20`}
          text={"単語帳を追加"}
          clickHandler={moveToVocabularyBookForm}
        />
      </div>
    ) : (
      <></>
    );
  return (
    <Card isError={true}>
      <div dangerouslySetInnerHTML={{ __html: message }}></div>
      {bookFormButton}
    </Card>
  );
};

export default NotFound;
